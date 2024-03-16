import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { todoFetcher } from "../swr/fetcher";
import useSWR from "swr";
import { Todo } from "../model/todo";

const Index = () => {
  const isLoggedIn = false;
  const { data } = useSWR("todos", todoFetcher);

  // const todoFetcher = (): Promise<any> => {
  //   return TestUsecase.getTodos();
  // };

  const [stores, setStores] = useState([]);

  // useEffect(() => {
  //   todoFetcher().then((data) => {
  //     setStores(data);
  //   }
  // }, []);

  useEffect(() => {
    todoFetcher().then((data) => {
      setStores(data);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {isLoggedIn && <Redirect href={"./(tabs)"} />}

      <Text className="text-blue-400">TOP</Text>
      <Link href={"./(tabs)/home"}>店舗検索</Link>
      <Pressable onPress={() => router.replace("./(tabs)")}>
        <Text className="text-blue-400">店舗検索(push)</Text>
      </Pressable>
      <Link href={"./(tabs2)"}>TODOサンプル</Link>

      <FlatList
        data={stores}
        renderItem={({ item }: { item: Todo }) => (
          <View className="flex flex-row justify-between bg-blue-100 p-4 m-2 rounded-lg">
            <Text
              className={`text-lg font-bold ${item.completed && "line-through"}`}
            >
              {item.id}: {item.title}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Index;
