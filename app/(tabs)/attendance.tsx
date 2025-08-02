import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react-native";

import { useStudentStore } from "@/hooks/use-student-store";
import AttendanceChart from "@/components/AttendanceChart";
import Colors from "@/constants/colors";
import { AttendanceStats } from "@/types";

export default function AttendanceScreen() {
  const { 
    currentStudent, 
    courses, 
    attendance, 
    getAttendancePercentage, 
    markAttendance, 
    isLoading 
  } = useStudentStore();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

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

  // Get attendance records for selected course
  const courseAttendanceRecords = selectedCourse
    ? attendance.filter(
        (record) => 
          record.courseId === selectedCourse && 
          record.studentId === currentStudent.id
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  // Get course name
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : "Unknown Course";
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Attendance Tracker",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }} 
      />
      <ScrollView style={styles.container} testID="attendance-screen">
        <AttendanceChart data={attendanceData} />
        
        <Text style={styles.sectionTitle}>Mark Today's Attendance</Text>
        
        <View style={styles.courseSelector}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[
                styles.courseButton,
                selectedCourse === course.id && styles.selectedCourseButton,
              ]}
              onPress={() => setSelectedCourse(course.id)}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  selectedCourse === course.id && styles.selectedCourseButtonText,
                ]}
              >
                {course.code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedCourse && (
          <View style={styles.attendanceActions}>
            <Text style={styles.selectedCourseTitle}>
              {getCourseName(selectedCourse)}
            </Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.light.success + "20" }]}
                onPress={() => markAttendance(selectedCourse, "present")}
              >
                <CheckCircle size={24} color={Colors.light.success} />
                <Text style={[styles.actionButtonText, { color: Colors.light.success }]}>
                  Present
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.light.warning + "20" }]}
                onPress={() => markAttendance(selectedCourse, "late")}
              >
                <Clock size={24} color={Colors.light.warning} />
                <Text style={[styles.actionButtonText, { color: Colors.light.warning }]}>
                  Late
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.light.danger + "20" }]}
                onPress={() => markAttendance(selectedCourse, "absent")}
              >
                <XCircle size={24} color={Colors.light.danger} />
                <Text style={[styles.actionButtonText, { color: Colors.light.danger }]}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Attendance History</Text>
        
        {selectedCourse ? (
          courseAttendanceRecords.length > 0 ? (
            courseAttendanceRecords.map((record) => (
              <View key={record.id} style={styles.historyItem}>
                <View style={styles.dateContainer}>
                  <Calendar size={16} color={Colors.light.gray} />
                  <Text style={styles.dateText}>{record.date}</Text>
                </View>
                <View
                  style={[
                    styles.statusContainer,
                    {
                      backgroundColor:
                        record.status === "present"
                          ? Colors.light.success + "20"
                          : record.status === "late"
                          ? Colors.light.warning + "20"
                          : Colors.light.danger + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          record.status === "present"
                            ? Colors.light.success
                            : record.status === "late"
                            ? Colors.light.warning
                            : Colors.light.danger,
                      },
                    ]}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No attendance records found</Text>
          )
        ) : (
          <Text style={styles.emptyText}>Select a course to view attendance history</Text>
        )}
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
  courseSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  courseButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedCourseButton: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  courseButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCourseButtonText: {
    color: "#fff",
  },
  attendanceActions: {
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
  selectedCourseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: Colors.light.gray,
    marginTop: 16,
    marginBottom: 24,
  },
});