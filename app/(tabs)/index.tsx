import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { useStudentStore } from "@/hooks/use-student-store";
import ProfileHeader from "@/components/ProfileHeader";
import AttendanceChart from "@/components/AttendanceChart";
import SGPACard from "@/components/SGPACard";
import CourseCard from "@/components/CourseCard";
import { AttendanceStats } from "@/types";

export default function DashboardScreen() {
  const { 
    currentStudent, 
    courses, 
    getAttendancePercentage, 
    calculateSGPA, 
    isLoading 
  } = useStudentStore();

  if (isLoading || !currentStudent) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Prepare attendance data for chart
  const attendanceData: AttendanceStats[] = courses.map((course) => ({
    courseId: course.id,
    courseName: course.name,
    totalClasses: 20, // Placeholder
    attended: Math.round((getAttendancePercentage(course.id) / 100) * 20), // Placeholder
    percentage: getAttendancePercentage(course.id),
  }));

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "University Dashboard",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }} 
      />
      <ScrollView style={styles.container} testID="dashboard-screen">
        <ProfileHeader student={currentStudent} />
        
        <AttendanceChart data={attendanceData} />
        
        <SGPACard 
          sgpa={parseFloat(calculateSGPA(currentStudent.semester).toString())} 
          semester={currentStudent.semester} 
        />
        
        <Text style={styles.sectionTitle}>Current Courses</Text>
        
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            attendancePercentage={getAttendancePercentage(course.id)}
            onPress={() => {
              console.log(`Navigating to course details: ${course.id}`);
            }}
          />
        ))}
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: "#333",
  },
});