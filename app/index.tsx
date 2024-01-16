import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";

const Index = () => {
  const isLoggedIn = true;

  return (
    <>
      {isLoggedIn && <Redirect href={"./(tabs)"} />}
      <View className="flex-1 justify-center items-center">
        <Text className="text-blue-400 mb-4">TOP</Text>
        <Link href="(tabs)">店舗検索</Link>
      </View>
    </>
  );
};

export default Index;
