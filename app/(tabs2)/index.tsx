import React, { FC, useMemo, useRef, useState } from "react";
import useTodoStore from "../../store/todoStore";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { Todo } from "../../model/todo";
import { useForm } from "react-hook-form";

const Index = () => {
  const inputRef = useRef<TextInput | null>(null);
  const [nextId, setNextId] = useState(4);
  const [isFocused, setIsFocused] = useState(false);

  const { handleSubmit, setValue, watch, reset } = useForm<Todo>({
    defaultValues: {
      id: 0,
      title: "",
      completed: false,
      archived: false,
    },
  });
  const onRegister = (name: keyof Todo) => {
    return (text: string) => {
      setValue(name, text as any, { shouldValidate: true });
    };
  };

  const { todos, addTodo, archiveTodo, toggleTodo } = useTodoStore();

  const onSubmit = (data: Todo) => {
    data.id = nextId;
    addTodo(data);
    // 次のIDをセット
    setNextId(nextId + 1);
    // フォームをリセット
    reset();
    // フォーカスを外す
    inputRef.current?.blur();
  };

  /**
   * アーカイブされていないTODOのみを取得
   */
  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.archived),
    [todos],
  );

  // フォーカスを外す
  const handlePressBackDrop = () => {
    // フォーカスを外す
    inputRef.current?.blur();
  };

  return (
    <>
      <View className={"p-2"}>
        <View className={"flex flex-row items-center p-2"}>
          <TextInput
            ref={inputRef}
            value={watch("title")}
            className="w-4/5 border p-2 rounded-lg mr-2 text-neutral-700 font-normal border-gray-400"
            onChangeText={onRegister("title")}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ここに入力してください"
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`w-1/5 flex items-center bg-blue-500 p-2 rounded-lg ${!watch("title") && "opacity-50"}`}
            disabled={!isFocused || !watch("title")}
          >
            <Text className="text-white font-bold text-lg">Add</Text>
          </TouchableOpacity>
        </View>

        <View className={"h-full"}>
          {/* 検索バー以外をタップした時backdropを表示 */}
          {isFocused && (
            <Pressable
              className={"absolute top-0 left-0 right-0 bottom-0 z-10"}
              onPress={handlePressBackDrop}
            />
          )}
          <FlatList
            data={activeTodos}
            renderItem={({ item }) => (
              <Item
                {...item}
                toggleTodo={toggleTodo}
                archiveTodo={archiveTodo}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </>
  );
};
export default Index;

export interface ItemProps {
  id: number;
  title: string;
  completed: boolean;
  archived: boolean;
  toggleTodo?: (id: number) => void;
  archiveTodo?: (id: number) => void;
  deleteTodo?: (id: number) => void;
}

export const Item: FC<ItemProps> = ({
  id,
  title,
  completed,
  archived,
  toggleTodo,
  archiveTodo,
  deleteTodo,
}) => {
  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        onPress={() => (archived ? deleteTodo!(id) : archiveTodo!(id))}
        className="justify-center pl-2"
      >
        <View className="bg-red-500 p-3 rounded-md">
          <Text className="text-white font-bold">
            <FontAwesome name="trash-o" size={24} />
            {archived ? "Delete" : "Archive"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View className="flex flex-row justify-between bg-blue-100 p-4 m-2 rounded-lg">
        <Text className={`text-lg font-bold ${completed && "line-through"}`}>
          {id}: {title}
        </Text>
        <Checkbox
          value={completed}
          onValueChange={() => (toggleTodo ? toggleTodo(id) : {})}
          disabled={archived}
        />
      </View>
    </Swipeable>
  );
};
