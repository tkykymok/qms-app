import { Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const MainLayout = () => {
  return (
    <Tabs
      initialRouteName={"index"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#d1d5db",
        },
        headerTitleStyle: {
          color: "#374151",
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#374151",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "店舗検索",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="search"
              size={24}
              color={focused ? "#3b82f6" : "#374151"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservationStatus"
        options={{
          title: "予約内容確認",
          tabBarLabel: "予約状況",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="note-check-outline"
              size={24}
              color={focused ? "#3b82f6" : "#374151"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reservationHistory"
        options={{
          title: "予約履歴",
          tabBarLabel: "予約履歴",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="note-multiple-outline"
              size={24}
              color={focused ? "#3b82f6" : "#374151"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="otherMenu"
        options={{
          title: "その他",
          tabBarLabel: "その他",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={24}
              color={focused ? "#3b82f6" : "#374151"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
