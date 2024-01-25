import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import React from "react";
import { todoFetcher } from "../swr/fetcher";
import useSWR from "swr";

const Index = () => {
  const isLoggedIn = false;
  const { data } = useSWR("todos", todoFetcher);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {isLoggedIn && <Redirect href={"./(tabs)"} />}

      <Text className="text-blue-400">TOP</Text>
      <Link href={"./(tabs)"}>店舗検索</Link>
      <Link href={"./(tabs2)"}>TODOサンプル</Link>

      <FlatList
        data={data}
        renderItem={({ item }) => (
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
