// Student types
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  section: string;
  batchNumber: string;
  profileImage?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
}

// Course types
export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  department: string;
  semester: number;
}

// Attendance types
export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceStats {
  courseId: string;
  courseName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

// Academic types
export interface ExamMark {
  id: string;
  courseId: string;
  studentId: string;
  examType: 'midterm' | 'assignment' | 'quiz' | 'final';
  maxMarks: number;
  obtainedMarks: number;
  date: string;
}

export interface GradePoint {
  grade: string;
  points: number;
}

export interface CourseGrade {
  courseId: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoint: number;
}

export interface SemesterResult {
  semester: number;
  courses: CourseGrade[];
  sgpa: number;
  totalCredits: number;
}

// Hostel types
export interface MealPlan {
  id: string;
  day: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface MealBooking {
  id: string;
  studentId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  status: 'booked' | 'cancelled' | 'consumed';
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'academic' | 'cultural' | 'sports' | 'technical' | 'social';
  maxParticipants?: number;
  currentParticipants: number;
  imageUrl?: string;
  registrationDeadline: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// Event Registration types
export interface EventRegistration {
  id: string;
  eventId: string;
  studentId: string;
  registrationDate: string;
  status: 'registered' | 'cancelled' | 'attended';
}
