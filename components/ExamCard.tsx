import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FileText } from "lucide-react-native";

import Colors from "@/constants/colors";
import { ExamMark } from "@/types";

interface ExamCardProps {
  exam: ExamMark;
  courseName: string;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, courseName }) => {
  const percentage = Math.round((exam.obtainedMarks / exam.maxMarks) * 100);
  
  const getStatusColor = () => {
    if (percentage >= 70) return Colors.light.success;
    if (percentage >= 40) return Colors.light.warning;
    return Colors.light.danger;
  };

  const getExamTypeLabel = () => {
    switch (exam.examType) {
      case "midterm":
        return "Mid-Term Exam";
      case "assignment":
        return "Assignment";
      case "quiz":
        return "Quiz";
      case "final":
        return "Final Exam";
      default:
        return exam.examType;
    }
  };

  return (
    <View style={styles.container} testID={`exam-card-${exam.id}`}>
      <View style={styles.iconContainer}>
        <FileText size={24} color={Colors.light.primary} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.examType}>{getExamTypeLabel()}</Text>
        <Text style={styles.courseName}>{courseName}</Text>
        <Text style={styles.date}>{exam.date}</Text>
      </View>
      <View style={styles.marksContainer}>
        <Text style={styles.marks}>
          {exam.obtainedMarks}/{exam.maxMarks}
        </Text>
        <View
          style={[
            styles.percentageContainer,
            { backgroundColor: getStatusColor() + "20" },
          ]}
        >
          <Text style={[styles.percentage, { color: getStatusColor() }]}>
            {percentage}%
          </Text>
        </View>
      </View>
    </View>
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
  examType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.light.gray,
  },
  marksContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  marks: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  percentageContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ExamCard;