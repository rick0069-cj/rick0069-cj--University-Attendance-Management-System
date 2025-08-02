import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { Stack } from "expo-router";
import { 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Droplet, 
  Settings, 
  LogOut,
  Camera,
  Award,
  BookOpen,
  Users
} from "lucide-react-native";

import { useStudentStore } from "@/hooks/use-student-store";
import Colors from "@/constants/colors";

const InfoCard: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  onPress?: () => void;
}> = ({ icon, label, value, onPress }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={[
        styles.infoCard,
        isPressed && Platform.OS !== 'web' && styles.infoCardPressed,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.infoCardIcon}>
        {icon}
      </View>
      <View style={styles.infoCardContent}>
        <Text style={styles.infoCardLabel}>{label}</Text>
        <Text style={styles.infoCardValue}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const StatCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string;
  color: string;
}> = ({ icon, title, value, subtitle, color }) => {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const { currentStudent, calculateSGPA, getAttendancePercentage, courses } = useStudentStore();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  if (!currentStudent) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  const overallAttendance = courses.length > 0 
    ? Math.round(courses.reduce((sum, course) => sum + getAttendancePercentage(course.id), 0) / courses.length)
    : 0;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "My Profile",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color={Colors.light.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container} testID="profile-screen">
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity
              style={[
                styles.profileImageWrapper,
                isPressed && Platform.OS !== 'web' && styles.profileImagePressed,
              ]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              activeOpacity={0.8}
            >
              <Image
                source={{ 
                  uri: currentStudent.profileImage || 
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80" 
                }}
                style={styles.profileImage}
              />
              <View style={styles.cameraOverlay}>
                <Camera size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentStudent.name}</Text>
            <Text style={styles.profileRoll}>{currentStudent.rollNumber}</Text>
            <View style={styles.batchContainer}>
              <Text style={styles.batchLabel}>Batch:</Text>
              <View style={styles.batchBadge}>
                <Text style={styles.batchText}>{currentStudent.batchNumber}</Text>
              </View>
            </View>
            <Text style={styles.profileDepartment}>
              {currentStudent.department} • Semester {currentStudent.semester} • Section {currentStudent.section}
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            icon={<Award size={20} color="#10B981" />}
            title="SGPA"
            value={calculateSGPA(currentStudent.semester).toString()}
            subtitle="Current Semester"
            color="#10B981"
          />
          <StatCard
            icon={<BookOpen size={20} color="#3B82F6" />}
            title="Attendance"
            value={`${overallAttendance}%`}
            subtitle="Overall Average"
            color="#3B82F6"
          />
          <StatCard
            icon={<Users size={20} color="#8B5CF6" />}
            title="Courses"
            value={courses.length.toString()}
            subtitle="This Semester"
            color="#8B5CF6"
          />
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <InfoCard
            icon={<Mail size={18} color={Colors.light.primary} />}
            label="Email"
            value={currentStudent.email || 'Not provided'}
            onPress={() => console.log('Edit email')}
          />
          
          <InfoCard
            icon={<Phone size={18} color={Colors.light.primary} />}
            label="Phone"
            value={currentStudent.phone || 'Not provided'}
            onPress={() => console.log('Edit phone')}
          />
          
          <InfoCard
            icon={<MapPin size={18} color={Colors.light.primary} />}
            label="Address"
            value={currentStudent.address || 'Not provided'}
            onPress={() => console.log('Edit address')}
          />
          
          <InfoCard
            icon={<Calendar size={18} color={Colors.light.primary} />}
            label="Date of Birth"
            value={formatDate(currentStudent.dateOfBirth || '')}
            onPress={() => console.log('Edit date of birth')}
          />
          
          <InfoCard
            icon={<Droplet size={18} color={Colors.light.primary} />}
            label="Blood Group"
            value={currentStudent.bloodGroup || 'Not provided'}
            onPress={() => console.log('Edit blood group')}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={20} color={Colors.light.primary} />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color={Colors.light.gray} />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
            <LogOut size={20} color="#EF4444" />
            <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  headerButton: {
    padding: 8,
  },
  profileHeader: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImagePressed: {
    transform: [{ scale: 0.95 }],
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.light.primary,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileRoll: {
    fontSize: 16,
    color: Colors.light.gray,
    marginBottom: 8,
  },
  batchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  batchLabel: {
    fontSize: 14,
    color: Colors.light.gray,
    marginRight: 8,
  },
  batchBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  batchText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  profileDepartment: {
    fontSize: 14,
    color: Colors.light.gray,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statContent: {
    alignItems: "flex-start",
  },
  statTitle: {
    fontSize: 12,
    color: Colors.light.gray,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: Colors.light.gray,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoCardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.1,
    elevation: 2,
  },
  infoCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary + '20',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardLabel: {
    fontSize: 12,
    color: Colors.light.gray,
    marginBottom: 2,
  },
  infoCardValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    color: "#EF4444",
  },
});