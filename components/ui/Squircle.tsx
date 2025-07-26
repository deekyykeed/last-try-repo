import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';

interface SquircleProps extends ViewProps {
  radius?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowOffset?: { width: number; height: number };
  shadowRadius?: number;
  backgroundColor?: string;
  elevation?: number;
}

export const Squircle: React.FC<SquircleProps> = ({
  children,
  radius = 10,
  shadowColor = '#000',
  shadowOpacity = 0.1,
  shadowOffset = { width: 0, height: 2 },
  shadowRadius = 3,
  backgroundColor = 'white',
  elevation = 3,
  style,
  ...props
}) => {
  const cornerSmoothing = 0; // Values between 0 and 1, where 1 is more rounded

  return (
    <SquircleView
      style={[
        {
          backgroundColor,
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            },
            android: {
              elevation,
            },
          }),
        },
        style,
      ]}
      squircleParams={{
        cornerRadius: radius,
        cornerSmoothing
      }}
      {...props}
    >
      {children}
    </SquircleView>
  );
};
