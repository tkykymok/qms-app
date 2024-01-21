import { Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const TodoLayout = () => {
  return (
    <Tabs
      initialRouteName={"index"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3b82f6",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#374151",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo",
          tabBarLabel: "Todo",
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
        name="archive"
        options={{
          title: "Archive",
          tabBarLabel: "Archive",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="note-check-outline"
              size={24}
              color={focused ? "#3b82f6" : "#374151"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TodoLayout;
