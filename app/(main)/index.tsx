import { Button, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

const Index = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  const handleOpenPress = () => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.expand();
  };

  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg mb-4">店舗検索</Text>
        <Button title={"Open Bottom Sheet"} onPress={handleOpenPress} />
      </View>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg mb-4">Bottom Sheet</Text>
        </View>
      </BottomSheet>
    </>
  );
};

export default Index;
