import { Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import GoogleMapWithInputView from "../../components/organisms/GoogleMapWithInputView";

const Index = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <>
      {/* GoogleMap */}
      <GoogleMapWithInputView />

      {/* BottomSheet 店舗詳細 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["50%"]}
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
