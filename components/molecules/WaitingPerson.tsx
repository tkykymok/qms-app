import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WaitingIconsProps {
  waitingCount: number;
  includeSelfInOrder?: number | null; // includedIdはオプショナルかつnull許容
  maxIcons?: number; // maxIconsはオプショナル
}

const WaitingIcons: React.FC<WaitingIconsProps> = ({
  waitingCount,
  includeSelfInOrder,
  maxIcons = 19, // デフォルト値は19
}) => {
  const icons = [];

  // 残りのアイコンを追加（最大数を超えないようにする）
  for (let i = 0; i < Math.min(waitingCount, maxIcons); i++) {
    // includedIdがiと一致する場合、そのアイコンを緑色にする
    const color = includeSelfInOrder === i ? "green" : "gray";
    icons.push(
      <Ionicons
        key={`person_${i}`}
        name="person" // Updated this line
        size={20}
        color={color}
        style={{ margin: 4 }} // React NativeではclassNameの代わりにstyleを使用
      />
    );
  }

  // アイコンが最大数を超えた場合、「...」を表示
  if (waitingCount > maxIcons) {
    icons.push(
      <Text key="more" style={{ fontSize: 18, color: "gray", margin: 8 }}>
        ...
      </Text>
    );
  }

  return <View style={styles.container}>{icons}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    borderStyle: "dotted",
    width: "100%", // 幅を100%に設定
    height: 100, // 高さを固定
  },
});

export default WaitingIcons;
