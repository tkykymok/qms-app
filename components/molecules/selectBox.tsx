import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";

export type Select = {
  key: string;
  label: string;
};

const SelectBox = ({ data }: { data: Select[] }) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const renderItem = ({ item }: { item: Select }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedValue(item.key);
        setVisible(false);
      }}
    >
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>
          {selectedValue || "選択してください"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.modalView}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // コンテナスタイル
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    // ボタンスタイル
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  buttonText: {
    // ボタンテキストスタイル
    fontSize: 18,
  },
  modalView: {
    // モーダルビュースタイル
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    // アイテムスタイル
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 5,
  },
  text: {
    // テキストスタイル
    fontSize: 18,
  },
});
export default SelectBox;
