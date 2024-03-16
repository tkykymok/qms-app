import { Button, Text, View, TouchableOpacity, Image } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { Store } from "../../model/store";
import { getWaitStatus } from "../../constants/WaitStatus";
import WaitingPerson from "../../components/molecules/WaitingPerson";
import { useRouter } from "expo-router";

interface StoreDetailBottomSheetProps {
  store: Store | null;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const fetchWaitTime = async () => {
  // APIから待ち時間を取得する仮定の関数
  return {
    waitTime: 0, // 何時間待ち（分）
  };
};

const StoreDetailBottomSheet: React.FC<StoreDetailBottomSheetProps> = ({
  store,
  bottomSheetRef,
}) => {
  const [waitInfo, setWaitInfo] = useState({ waitTime: 0 });
  const router = useRouter();

  //   useEffect(() => {
  //     const getWaitTime = async () => {
  //       const info = await fetchWaitTime();
  //       setWaitInfo(info);
  //     };
  //     getWaitTime();
  //   }, []);

  const { message, color } = getWaitStatus(waitInfo.waitTime);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["50%"]}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              paddingVertical: 10,
              marginHorizontal: 10,
              borderRadius: 5,
              backgroundColor: color,
              alignItems: "center",
            }}
          >
            <Text className="text-white">{message}</Text>
          </View>
        </View>
        {store ? (
          <>
            <View>
              <Text style={{ textAlign: "center" }}>
                ご案内時間の目安: {store.storeName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start", // 上端揃えにする
                flex: 1,
              }}
            >
              <View
                style={{
                  flex: 3, // ここで左右のセクションが等しい幅を持つように設定
                  padding: 10, // 必要に応じてパディングを調整
                }}
              >
                <Image
                  src="../../assets/images/store.png"
                  style={{ width: 100, height: 115 }}
                />
                <Text>{store.storeName}</Text>
                <Text>営業時間: {store.weekdayHours}</Text>
                <Text>定休日: {store.regularHolidays.join(", ")}</Text>
              </View>

              <View
                style={{
                  flex: 4, // ここで左右のセクションが等しい幅を持つように設定
                  flexDirection: "column",
                  padding: 10, // 必要に応じてパディングを調整
                }}
              >
                <Text style={{ marginLeft: 5 }}>・対応待ちスタッフ: {3}</Text>
                <Text style={{ margin: 5 }}>・ご案内待ち: 今すぐ</Text>
                <WaitingPerson waitingCount={18} maxIcons={17} />
              </View>
            </View>
          </>
        ) : (
          <Text className="text-lg mb-4">No store selected</Text>
        )}
        <View
          style={{
            height: "30%",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#99ccff",
                padding: 20,
                marginTop: 10,
                borderRadius: 5,
                width: "70%",
                alignItems: "center",
              }}
              onPress={() => router.push("./home/reservationStatus")}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                予約する
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default StoreDetailBottomSheet;
