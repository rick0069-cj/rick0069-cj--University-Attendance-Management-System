import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Coffee, Utensils, Moon } from "lucide-react-native";

import Colors from "@/constants/colors";

interface MealCardProps {
  date: string;
  day: string;
  mealType: "breakfast" | "lunch" | "dinner";
  items: string[];
  isBooked: boolean;
  onToggleBooking: () => void;
}

const MealCard: React.FC<MealCardProps> = ({
  date,
  day,
  mealType,
  items,
  isBooked,
  onToggleBooking,
}) => {
  const getIcon = () => {
    switch (mealType) {
      case "breakfast":
        return <Coffee size={24} color={Colors.light.primary} />;
      case "lunch":
        return <Utensils size={24} color={Colors.light.primary} />;
      case "dinner":
        return <Moon size={24} color={Colors.light.primary} />;
    }
  };

  const getMealTitle = () => {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  };

  return (
    <View style={styles.container} testID={`meal-card-${mealType}-${date}`}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.mealType}>{getMealTitle()}</Text>
          <Text style={styles.dateText}>
            {day}, {date}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.menuTitle}>Menu</Text>
        <View style={styles.menuItems}>
          {items.map((item, index) => (
            <Text key={index} style={styles.menuItem}>
              • {item}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.bookButton,
          {
            backgroundColor: isBooked
              ? Colors.light.danger
              : Colors.light.primary,
          },
        ]}
        onPress={onToggleBooking}
      >
        <Text style={styles.bookButtonText}>
          {isBooked ? "Cancel Booking" : "Book Meal"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  mealType: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: Colors.light.gray,
  },
  content: {
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  menuItems: {
    marginLeft: 8,
  },
  menuItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  bookButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MealCard;