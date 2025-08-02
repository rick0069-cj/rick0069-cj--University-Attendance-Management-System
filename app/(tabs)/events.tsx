import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { Stack } from "expo-router";
import { Calendar, MapPin, Users, Clock } from "lucide-react-native";


import { mockEvents } from "@/mocks/events";
import { Event } from "@/types";
import Colors from "@/constants/colors";

const EventCard: React.FC<{ event: Event; onPress: () => void }> = ({ event, onPress }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return '#3B82F6';
      case 'cultural': return '#EF4444';
      case 'sports': return '#10B981';
      case 'academic': return '#8B5CF6';
      case 'social': return '#F59E0B';
      default: return Colors.light.primary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.eventCard,
        isPressed && Platform.OS !== 'web' && styles.eventCardPressed,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.7}
      testID={`event-card-${event.id}`}
    >
      <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryText}>{event.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.eventTitle}>{event.title}</Text>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Calendar size={16} color={Colors.light.gray} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock size={16} color={Colors.light.gray} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={16} color={Colors.light.gray} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Users size={16} color={Colors.light.gray} />
            <Text style={styles.detailText}>
              {event.currentParticipants}{event.maxParticipants ? `/${event.maxParticipants}` : ''} participants
            </Text>
          </View>
        </View>
        
        <View style={styles.eventFooter}>
          <Text style={styles.organizerText}>by {event.organizer}</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', 'technical', 'cultural', 'sports', 'academic', 'social'];
  
  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  const handleEventPress = (event: Event) => {
    console.log(`Event pressed: ${event.title}`);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Campus Events",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }} 
      />
      <View style={styles.container}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.eventsContainer} testID="events-screen">
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Events' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`}
          </Text>
          
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event)}
            />
          ))}
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
  categoryFilter: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  categoryButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  eventsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  eventCardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.15,
    elevation: 4,
  },
  eventImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.light.gray,
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  organizerText: {
    fontSize: 12,
    color: Colors.light.gray,
    fontStyle: "italic",
  },
  registerButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});