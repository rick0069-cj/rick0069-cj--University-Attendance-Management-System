import { MealPlan, MealBooking } from "@/types";

export const mockMealPlans: MealPlan[] = [
  {
    id: "mp1",
    day: "Monday",
    breakfast: ["Bread", "Eggs", "Milk", "Cereal"],
    lunch: ["Rice", "Dal", "Vegetables", "Yogurt"],
    dinner: ["Chapati", "Paneer Curry", "Salad", "Dessert"],
  },
  {
    id: "mp2",
    day: "Tuesday",
    breakfast: ["Paratha", "Curd", "Fruit", "Tea"],
    lunch: ["Pulao", "Rajma", "Raita", "Papad"],
    dinner: ["Naan", "Chicken Curry", "Vegetables", "Ice Cream"],
  },
  {
    id: "mp3",
    day: "Wednesday",
    breakfast: ["Idli", "Sambhar", "Chutney", "Coffee"],
    lunch: ["Biryani", "Salan", "Raita", "Salad"],
    dinner: ["Chapati", "Mixed Vegetables", "Dal", "Fruit"],
  },
  {
    id: "mp4",
    day: "Thursday",
    breakfast: ["Upma", "Coconut Chutney", "Fruit", "Tea"],
    lunch: ["Rice", "Sambar", "Rasam", "Curd"],
    dinner: ["Chapati", "Palak Paneer", "Dal", "Sweet"],
  },
  {
    id: "mp5",
    day: "Friday",
    breakfast: ["Poha", "Chutney", "Milk", "Fruit"],
    lunch: ["Chole Bhature", "Raita", "Salad", "Pickle"],
    dinner: ["Chapati", "Egg Curry", "Dal", "Kheer"],
  },
  {
    id: "mp6",
    day: "Saturday",
    breakfast: ["Dosa", "Sambhar", "Chutney", "Coffee"],
    lunch: ["Puri", "Aloo Sabzi", "Raita", "Papad"],
    dinner: ["Chapati", "Matar Paneer", "Dal", "Fruit"],
  },
  {
    id: "mp7",
    day: "Sunday",
    breakfast: ["Aloo Paratha", "Curd", "Pickle", "Tea"],
    lunch: ["Special Thali", "Sweet", "Papad", "Salad"],
    dinner: ["Chapati", "Butter Chicken", "Dal", "Ice Cream"],
  },
];

// Generate dates for the next 7 days
const generateNextDates = (days: number) => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

const nextDates = generateNextDates(7);

// Generate mock meal bookings
export const mockMealBookings: MealBooking[] = [];

// For each student and date
for (let studentId = 1; studentId <= 3; studentId++) {
  nextDates.forEach((date, index) => {
    // Breakfast booking
    if (Math.random() > 0.3) { // 70% chance of booking breakfast
      mockMealBookings.push({
        id: `meal_b_${studentId}_${index}`,
        studentId: `s${studentId}`,
        date,
        mealType: 'breakfast',
        status: 'booked',
      });
    }
    
    // Lunch booking
    if (Math.random() > 0.2) { // 80% chance of booking lunch
      mockMealBookings.push({
        id: `meal_l_${studentId}_${index}`,
        studentId: `s${studentId}`,
        date,
        mealType: 'lunch',
        status: 'booked',
      });
    }
    
    // Dinner booking
    if (Math.random() > 0.1) { // 90% chance of booking dinner
      mockMealBookings.push({
        id: `meal_d_${studentId}_${index}`,
        studentId: `s${studentId}`,
        date,
        mealType: 'dinner',
        status: 'booked',
      });
    }
  });
}