simport AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import createContextHook from "@nkzw/create-context-hook";
import { useEffect, useState } from "react";

import { Student, Course, AttendanceRecord, ExamMark, MealBooking } from "@/types";
import { mockStudents } from "@/mocks/students";
import { mockCourses } from "@/mocks/courses";
import { mockAttendance } from "@/mocks/attendance";
import { mockExams } from "@/mocks/exams";
import { mockMealBookings } from "@/mocks/meals";

export const [StudentContext, useStudentStore] = createContextHook(() => {
  // Student data
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [exams, setExams] = useState<ExamMark[]>([]);
  const [mealBookings, setMealBookings] = useState<MealBooking[]>([]);

  // Load data from AsyncStorage or use mock data
  const studentQuery = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const storedStudent = await AsyncStorage.getItem("currentStudent");
      return storedStudent ? JSON.parse(storedStudent) : mockStudents[0];
    },
  });

  const coursesQuery = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const storedCourses = await AsyncStorage.getItem("courses");
      return storedCourses ? JSON.parse(storedCourses) : mockCourses;
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const storedAttendance = await AsyncStorage.getItem("attendance");
      return storedAttendance ? JSON.parse(storedAttendance) : mockAttendance;
    },
  });

  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const storedExams = await AsyncStorage.getItem("exams");
      return storedExams ? JSON.parse(storedExams) : mockExams;
    },
  });

  const mealBookingsQuery = useQuery({
    queryKey: ["mealBookings"],
    queryFn: async () => {
      const storedMealBookings = await AsyncStorage.getItem("mealBookings");
      return storedMealBookings ? JSON.parse(storedMealBookings) : mockMealBookings;
    },
  });

  // Update state when queries complete
  useEffect(() => {
    if (studentQuery.data) {
      setCurrentStudent(studentQuery.data);
    }
  }, [studentQuery.data]);

  useEffect(() => {
    if (coursesQuery.data) {
      setCourses(coursesQuery.data);
    }
  }, [coursesQuery.data]);

  useEffect(() => {
    if (attendanceQuery.data) {
      setAttendance(attendanceQuery.data);
    }
  }, [attendanceQuery.data]);

  useEffect(() => {
    if (examsQuery.data) {
      setExams(examsQuery.data);
    }
  }, [examsQuery.data]);

  useEffect(() => {
    if (mealBookingsQuery.data) {
      setMealBookings(mealBookingsQuery.data);
    }
  }, [mealBookingsQuery.data]);

  // Calculate attendance percentage for a course
  const getAttendancePercentage = (courseId: string) => {
    const courseAttendance = attendance.filter(
      (record) => record.courseId === courseId && record.studentId === currentStudent?.id
    );
    
    const totalClasses = courseAttendance.length;
    if (totalClasses === 0) return 0;
    
    const attendedClasses = courseAttendance.filter(
      (record) => record.status === "present" || record.status === "late"
    ).length;
    
    return Math.round((attendedClasses / totalClasses) * 100);
  };

  // Calculate SGPA
  const calculateSGPA = (semesterNumber: number) => {
    const semesterCourses = courses.filter((course) => course.semester === semesterNumber);
    
    if (semesterCourses.length === 0) return 0;
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    semesterCourses.forEach((course) => {
      const courseExams = exams.filter(
        (exam) => exam.courseId === course.id && exam.studentId === currentStudent?.id
      );
      
      if (courseExams.length === 0) return;
      
      // Calculate total marks for the course
      const totalObtained = courseExams.reduce((sum, exam) => sum + exam.obtainedMarks, 0);
      const totalMax = courseExams.reduce((sum, exam) => sum + exam.maxMarks, 0);
      const percentage = (totalObtained / totalMax) * 100;
      
      // Convert percentage to grade point
      let gradePoint = 0;
      if (percentage >= 90) gradePoint = 10;
      else if (percentage >= 80) gradePoint = 9;
      else if (percentage >= 70) gradePoint = 8;
      else if (percentage >= 60) gradePoint = 7;
      else if (percentage >= 50) gradePoint = 6;
      else if (percentage >= 40) gradePoint = 5;
      else gradePoint = 0;
      
      totalGradePoints += gradePoint * course.credits;
      totalCredits += course.credits;
    });
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  };

  // Mark attendance
  const markAttendance = (courseId: string, status: 'present' | 'absent' | 'late') => {
    if (!currentStudent) return;
    
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendance.find(
      (record) => 
        record.courseId === courseId && 
        record.studentId === currentStudent.id && 
        record.date === today
    );
    
    if (existingRecord) {
      // Update existing record
      const updatedAttendance = attendance.map((record) => {
        if (record.id === existingRecord.id) {
          return { ...record, status };
        }
        return record;
      });
      setAttendance(updatedAttendance);
      AsyncStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    } else {
      // Create new record
      const newRecord: AttendanceRecord = {
        id: `att_${Date.now()}`,
        courseId,
        studentId: currentStudent.id,
        date: today,
        status,
      };
      const updatedAttendance = [...attendance, newRecord];
      setAttendance(updatedAttendance);
      AsyncStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    }
  };

  // Book a meal
  const bookMeal = (mealType: 'breakfast' | 'lunch' | 'dinner', date: string) => {
    if (!currentStudent) return;
    
    const existingBooking = mealBookings.find(
      (booking) => 
        booking.studentId === currentStudent.id && 
        booking.date === date &&
        booking.mealType === mealType
    );
    
    if (existingBooking) {
      // Update existing booking
      const updatedBookings = mealBookings.map((booking) => {
        if (booking.id === existingBooking.id) {
          return { ...booking, status: 'booked' as const };
        }
        return booking;
      });
      setMealBookings(updatedBookings);
      AsyncStorage.setItem("mealBookings", JSON.stringify(updatedBookings));
    } else {
      // Create new booking
      const newBooking: MealBooking = {
        id: `meal_${Date.now()}`,
        studentId: currentStudent.id,
        date,
        mealType,
        status: 'booked',
      };
      const updatedBookings = [...mealBookings, newBooking];
      setMealBookings(updatedBookings);
      AsyncStorage.setItem("mealBookings", JSON.stringify(updatedBookings));
    }
  };

  // Cancel a meal booking
  const cancelMealBooking = (bookingId: string) => {
    const updatedBookings = mealBookings.map((booking) => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'cancelled' as const };
      }
      return booking;
    });
    setMealBookings(updatedBookings);
    AsyncStorage.setItem("mealBookings", JSON.stringify(updatedBookings));
  };

  return {
    currentStudent,
    courses,
    attendance,
    exams,
    mealBookings,
    isLoading: 
      studentQuery.isLoading || 
      coursesQuery.isLoading || 
      attendanceQuery.isLoading || 
      examsQuery.isLoading || 
      mealBookingsQuery.isLoading,
    getAttendancePercentage,
    calculateSGPA,
    markAttendance,
    bookMeal,
    cancelMealBooking,
  };
});