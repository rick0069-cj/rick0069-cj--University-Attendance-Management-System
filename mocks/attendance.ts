mport { AttendanceRecord } from "@/types";

// Generate dates for the past 30 days
const generatePastDates = (days: number) => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

const pastDates = generatePastDates(30);

// Generate mock attendance data
export const mockAttendance: AttendanceRecord[] = [];

// For each student, course, and date combination
for (let studentId = 1; studentId <= 3; studentId++) {
  for (let courseId = 1; courseId <= 5; courseId++) {
    pastDates.forEach((date, index) => {
      // Randomly determine attendance status with a bias toward present
      const randomValue = Math.random();
      let status: 'present' | 'absent' | 'late';
      
      if (randomValue < 0.8) {
        status = 'present';
      } else if (randomValue < 0.9) {
        status = 'late';
      } else {
        status = 'absent';
      }
      
      mockAttendance.push({
        id: `att_${studentId}_${courseId}_${index}`,
        studentId: `s${studentId}`,
        courseId: `c${courseId}`,
        date,
        status,
      });
    });
  }
}