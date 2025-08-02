import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

import { useStudentStore } from "@/hooks/use-student-store";
import MealCard from "@/components/MealCard";
import Colors from "@/constants/colors";
import { mockMealPlans } from "@/mocks/meals";

export default function HostelScreen() {
  const { 
    currentStudent, 
    mealBookings, 
    bookMeal, 
    cancelMealBooking, 
    isLoading 
  } = useStudentStore();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  if (isLoading || !currentStudent) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Generate next 7 days
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split("T")[0],
      day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()],
      displayDate: date.getDate(),
      displayMonth: date.toLocaleString("default", { month: "short" }),
    };
  });

  // Get meal plan for selected day
  const getMealPlanForDay = (day: string) => {
    return mockMealPlans.find((plan) => plan.day === day) || mockMealPlans[0];
  };

  // Check if meal is booked
  const isMealBooked = (date: string, mealType: "breakfast" | "lunch" | "dinner") => {
    return mealBookings.some(
      (booking) =>
        booking.studentId === currentStudent.id &&
        booking.date === date &&
        booking.mealType === mealType &&
        booking.status === "booked"
    );
  };

  // Get booking ID
  const getBookingId = (date: string, mealType: "breakfast" | "lunch" | "dinner") => {
    const booking = mealBookings.find(
      (b) =>
        b.studentId === currentStudent.id &&
        b.date === date &&
        b.mealType === mealType &&
        b.status === "booked"
    );
    return booking ? booking.id : null;
  };

  // Handle meal booking toggle
  const handleToggleBooking = (date: string, mealType: "breakfast" | "lunch" | "dinner") => {
    if (isMealBooked(date, mealType)) {
      const bookingId = getBookingId(date, mealType);
      if (bookingId) {
        cancelMealBooking(bookingId);
      }
    } else {
      bookMeal(mealType, date);
    }
  };

  // Get selected day
  const selectedDay = next7Days.find((day) => day.date === selectedDate)?.day || "Monday";
  const mealPlan = getMealPlanForDay(selectedDay);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Hostel Meal Corner",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }} 
      />
      <View style={styles.container} testID="hostel-screen">
        <View style={styles.dateSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {next7Days.map((day) => (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dateButton,
                  selectedDate === day.date && styles.selectedDateButton,
                ]}
                onPress={() => setSelectedDate(day.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === day.date && styles.selectedDayText,
                  ]}
                >
                  {day.day.substring(0, 3)}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === day.date && styles.selectedDateText,
                  ]}
                >
                  {day.displayDate}
                </Text>
                <Text
                  style={[
                    styles.monthText,
                    selectedDate === day.date && styles.selectedMonthText,
                  ]}
                >
                  {day.displayMonth}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Today's Menu</Text>
          
          <MealCard
            date={selectedDate}
            day={selectedDay}
            mealType="breakfast"
            items={mealPlan.breakfast}
            isBooked={isMealBooked(selectedDate, "breakfast")}
            onToggleBooking={() => handleToggleBooking(selectedDate, "breakfast")}
          />
          
          <MealCard
            date={selectedDate}
            day={selectedDay}
            mealType="lunch"
            items={mealPlan.lunch}
            isBooked={isMealBooked(selectedDate, "lunch")}
            onToggleBooking={() => handleToggleBooking(selectedDate, "lunch")}
          />
          
          <MealCard
            date={selectedDate}
            day={selectedDay}
            mealType="dinner"
            items={mealPlan.dinner}
            isBooked={isMealBooked(selectedDate, "dinner")}
            onToggleBooking={() => handleToggleBooking(selectedDate, "dinner")}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateSelector: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  dateButton: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  selectedDateButton: {
    backgroundColor: Colors.light.primary,
  },
  dayText: {
    fontSize: 14,
    color: Colors.light.gray,
    marginBottom: 4,
  },
  selectedDayText: {
    color: "#fff",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  selectedDateText: {
    color: "#fff",
  },
  monthText: {
    fontSize: 12,
    color: Colors.light.gray,
  },
  selectedMonthText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: "#333",
  },
});