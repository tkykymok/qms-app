import { FlatList, Text, View } from "react-native";
import { FC } from "react";

type ReservationHistory = {
  id: number;
  storeName: string;
  visitedDate: string;
};

const ReservationHistory = () => {
  const data: ReservationHistory[] = [
    { id: 1, storeName: "店舗1", visitedDate: "2021/08/01" },
    { id: 2, storeName: "店舗2", visitedDate: "2021/08/02" },
    { id: 3, storeName: "店舗3", visitedDate: "2021/08/03" },
    { id: 4, storeName: "店舗4", visitedDate: "2021/08/04" },
    { id: 5, storeName: "店舗5", visitedDate: "2021/08/05" },
    { id: 6, storeName: "店舗6", visitedDate: "2021/08/06" },
    { id: 7, storeName: "店舗7", visitedDate: "2021/08/07" },
    { id: 8, storeName: "店舗8", visitedDate: "2021/08/08" },
    { id: 9, storeName: "店舗9", visitedDate: "2021/08/09" },
    { id: 10, storeName: "店舗10", visitedDate: "2021/08/10" },
  ];

  return (
    <View className="flex-1 ">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            storeName={item.storeName}
            visitedDate={item.visitedDate}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ReservationHistory;

const Item: FC<ReservationHistory> = ({ id, storeName, visitedDate }) => (
  <View className="bg-purple-200 p-4 m-2 rounded-lg">
    <Text className="text-lg font-bold">{storeName}</Text>
    <Text>{visitedDate}</Text>
  </View>
);
