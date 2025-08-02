# -University-Attendance-Management-System
#🎓 University- Attendance -Management -System
🛠️ Prototype Stage – This project is still in development. New features and improvements will be added over time.
📌 Description
The University Attendance Management System is a web-based application designed to streamline the process of recording and managing student attendance. Built with TypeScript for both frontend and backend to ensure strong typing and scalability.
# ⚙️ Tech Stack
Languages and Technologies Used in Your Project
# Frontend
⦁	Language : TypeScript/JavaScript
⦁	Framework : React Native with Expo
⦁	UI Components : Native React Native components
⦁	State Management : Zustand (as seen in use-student-store.ts)
⦁	Data Fetching : React Query with tRPC client
⦁	Styling : StyleSheet API from React Native and possibly NativeWind (based on package.json)
# Backend
⦁	Language : TypeScript
⦁	Framework : Hono.js (lightweight web framework)
⦁	API Architecture : tRPC (end-to-end typesafe API)
⦁	Data Validation : Zod (schema validation library)
⦁	Data Transformation : SuperJSON (for serializing data between frontend and backend)
# Data Storage
⦁	Currently using mock data and AsyncStorage (local device storage)
⦁	The architecture is prepared for potential database integration (commented in create-context.ts)

#- 📁 Project Structure

# University-Attendance-Management-System/
├── app/                     # App routing and layout logic
│   ├── (auth)/              # Auth routes (e.g., login/register pages)
│   ├── layout.tsx  
│   ├── page.tsx  
│   └── route-handlers.ts    # Route handlers (if applicable)
├── assets/                 # Static images, icons, etc.
│   └── images/
├── backend/                # Backend folder (Express + TypeScript)
│   └── src/  
│       ├── routes/
│       └── index.ts
├── components/             # Reusable React (TSX) components
│   ├── AdminStudentCharts.tsx
│   ├── CourseCard.tsx
│   ├── ExamCard.tsx
│   ├── MiniCard.tsx
│   ├── ProfileStudentBox.tsx
│   └── SGPASection.tsx
├── constants/              # Constant values (routes, messages, etc.)
│   └── index.ts
├── hooks/                  # Custom React hooks
│   └── use-student-elements.ts
├── lib/                    # Utility functions and helpers
│   └── (empty for now)
├── mocks/                  # Mock data for development
│   ├── attendance.ts
│   ├── exams.ts
│   ├── marks.ts
│   ├── results.ts
│   └── students.ts
├── types/                  # Global TypeScript type definitions
│   └── index.ts
├── .gitignore              # Git ignored files
├── app.json                # App configuration (likely for Expo/Next.js)
├── bun.lock                # Bun package manager lock file
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration


Contributions are welcome! Feel free to fork the repo, raise issues, and submit pull requests.

#🚀 Features (In Progress)
TypeScript-based React UI
Basic student management
Basic attendance logging
