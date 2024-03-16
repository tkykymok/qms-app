// RootLayout.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="reservationStatus"
          options={{ title: "reservationStatus", headerShown: true }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
