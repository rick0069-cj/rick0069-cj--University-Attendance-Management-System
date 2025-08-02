import { ExamMark } from "@/types";

export const mockExams: ExamMark[] = [];

// For each student and course
for (let studentId = 1; studentId <= 3; studentId++) {
  for (let courseId = 1; courseId <= 5; courseId++) {
    // Add midterm exam
    mockExams.push({
      id: `exam_mid_${studentId}_${courseId}`,
      studentId: `s${studentId}`,
      courseId: `c${courseId}`,
      examType: 'midterm',
      maxMarks: 50,
      obtainedMarks: Math.floor(Math.random() * 20) + 30, // Random marks between 30-50
      date: '2025-04-15',
    });
    
    // Add assignments
    for (let i = 1; i <= 3; i++) {
      mockExams.push({
        id: `exam_assign_${studentId}_${courseId}_${i}`,
        studentId: `s${studentId}`,
        courseId: `c${courseId}`,
        examType: 'assignment',
        maxMarks: 20,
        obtainedMarks: Math.floor(Math.random() * 8) + 12, // Random marks between 12-20
        date: `2025-0${i+2}-${i*5}`,
      });
    }
    
    // Add quizzes
    for (let i = 1; i <= 2; i++) {
      mockExams.push({
        id: `exam_quiz_${studentId}_${courseId}_${i}`,
        studentId: `s${studentId}`,
        courseId: `c${courseId}`,
        examType: 'quiz',
        maxMarks: 10,
        obtainedMarks: Math.floor(Math.random() * 4) + 6, // Random marks between 6-10
        date: `2025-0${i+3}-${i*10}`,
      });
    }
    
    // Add final exam
    mockExams.push({
      id: `exam_final_${studentId}_${courseId}`,
      studentId: `s${studentId}`,
      courseId: `c${courseId}`,
      examType: 'final',
      maxMarks: 100,
      obtainedMarks: Math.floor(Math.random() * 30) + 70, // Random marks between 70-100
      date: '2025-07-20',
    });
  }
}