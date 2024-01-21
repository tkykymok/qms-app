import React, { useMemo } from "react";
import useTodoStore from "../../store/todoStore";
import { FlatList, Platform, SafeAreaView, View } from "react-native";
import { Item } from "./index";

const Archive = () => {
  const { todos, addTodo, deleteTodo } = useTodoStore();

  const deletedTodos = useMemo(
    () => todos.filter((todo) => todo.archived),
    [todos],
  );

  const isAndroid = Platform.OS === "android";

  return (
    <View className={`${isAndroid && "mt-5"}`}>
      <FlatList
        data={deletedTodos}
        renderItem={({ item }) => <Item {...item} deleteTodo={deleteTodo} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Archive;
