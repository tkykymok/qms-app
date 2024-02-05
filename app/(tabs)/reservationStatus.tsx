import React from "react";
import { Text, View } from "react-native";
import WaitingIcons from "../../components/molecules/WaitingPerson";

const ReservationStatus = () => {
  return (
    <View>
      <Text>予約状況</Text>
      <WaitingIcons waitingCount={20} includeSelfInOrder={5} />
    </View>
  );
};

export default ReservationStatus;
