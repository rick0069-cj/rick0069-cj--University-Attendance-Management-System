import React, { useState } from "react";
import { TouchableOpacity, Platform, ViewStyle } from "react-native";

interface BubbleButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  bubbleScale?: number;
  bubbleOpacity?: number;
  disabled?: boolean;
  testID?: string;
}

const BubbleButton: React.FC<BubbleButtonProps> = ({
  children,
  onPress,
  style,
  bubbleScale = 0.95,
  bubbleOpacity = 0.7,
  disabled = false,
  testID,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const bubbleStyle = isPressed && Platform.OS !== 'web' ? {
    transform: [{ scale: bubbleScale }],
    opacity: bubbleOpacity,
  } : {};

  return (
    <TouchableOpacity
      style={[style, bubbleStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={bubbleOpacity}
      disabled={disabled}
      testID={testID}
    >
      {children}
    </TouchableOpacity>
  );
};

export default BubbleButton;