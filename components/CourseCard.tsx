import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BookOpen } from "lucide-react-native";

import Colors from "@/constants/colors";
import { Course } from "@/types";
import BubbleButton from "@/components/BubbleButton";

interface CourseCardProps {
  course: Course;
  attendancePercentage: number;
  onPress: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  attendancePercentage,
  onPress,
}) => {
  const isAttendanceGood = attendancePercentage >= 75;

  return (
    <BubbleButton
      style={styles.container}
      onPress={onPress}
      testID={`course-card-${course.id}`}
      bubbleScale={0.97}
    >
      <View style={styles.iconContainer}>
        <BookOpen size={24} color={Colors.light.primary} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.courseCode}>{course.code}</Text>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.credits}>{course.credits} Credits</Text>
        <View
          style={[
            styles.attendanceContainer,
            {
              backgroundColor: isAttendanceGood
                ? Colors.light.success + "20"
                : Colors.light.danger + "20",
            },
          ]}
        >
          <Text
            style={[
              styles.attendanceText,
              {
                color: isAttendanceGood
                  ? Colors.light.success
                  : Colors.light.danger,
              },
            ]}
          >
            {attendancePercentage}%
          </Text>
        </View>
      </View>
    </BubbleButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  courseCode: {
    fontSize: 14,
    color: Colors.light.gray,
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  credits: {
    fontSize: 14,
    color: Colors.light.gray,
    marginBottom: 8,
  },
  attendanceContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CourseCard;
