import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

import { useStudentStore } from "@/hooks/use-student-store";
import SGPACard from "@/components/SGPACard";
import ExamCard from "@/components/ExamCard";
import Colors from "@/constants/colors";

export default function AcademicsScreen() {
  const { 
    currentStudent, 
    courses, 
    exams, 
    calculateSGPA, 
    isLoading 
  } = useStudentStore();

  const [selectedTab, setSelectedTab] = useState<"marks" | "sgpa">("marks");

  if (isLoading || !currentStudent) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Get course name
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : "Unknown Course";
  };

  // Filter exams for current student
  const studentExams = exams.filter(
    (exam) => exam.studentId === currentStudent.id
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Academic Records",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }} 
      />
      <View style={styles.container} testID="academics-screen">
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "marks" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("marks")}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === "marks" && styles.activeTabButtonText,
              ]}
            >
              Exam Marks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "sgpa" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("sgpa")}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === "sgpa" && styles.activeTabButtonText,
              ]}
            >
              SGPA
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contentContainer}>
          {selectedTab === "marks" ? (
            <>
              <Text style={styles.sectionTitle}>Recent Exam Results</Text>
              {studentExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  courseName={getCourseName(exam.courseId)}
                />
              ))}
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Semester GPA</Text>
              {Array.from({ length: currentStudent.semester }, (_, i) => i + 1).map(
                (semester) => (
                  <SGPACard
                    key={semester}
                    semester={semester}
                    sgpa={parseFloat(calculateSGPA(semester).toString())}
                  />
                )
              )}
              
              <View style={styles.cgpaCard}>
                <Text style={styles.cgpaTitle}>Cumulative GPA</Text>
                <Text style={styles.cgpaValue}>
                  {(
                    Array.from(
                      { length: currentStudent.semester },
                      (_, i) => parseFloat(calculateSGPA(i + 1).toString())
                    ).reduce((sum, sgpa) => sum + sgpa, 0) / currentStudent.semester
                  ).toFixed(2)}
                </Text>
              </View>
            </>
          )}
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: Colors.light.primary,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.gray,
  },
  activeTabButtonText: {
    color: Colors.light.primary,
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
  cgpaCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cgpaTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  cgpaValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
});