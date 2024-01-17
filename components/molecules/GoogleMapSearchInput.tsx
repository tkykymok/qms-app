import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { FC, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";

interface GoogleMapSearchInputProps {
  handleOnPressSearchResult: (details: GooglePlaceDetail | null) => void;
}

const GoogleMapSearchInput: FC<GoogleMapSearchInputProps> = ({
  handleOnPressSearchResult,
}) => {
  // 検索バーのフォーカス状態
  const [isFocused, setIsFocused] = useState(false);

  /**
   * 検索バー以外をタップした時の処理
   */
  const onPressBackDrop = () => {
    Keyboard.dismiss();
  };

  // スタイル
  const styles = StyleSheet.create({
    backdrop: {
      position: "absolute",
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明の背景色
    },
    safeArea: {
      position: "absolute",
      top: Platform.OS === "ios" ? 0 : 23,
      width: Platform.OS === "ios" ? "100%" : "90%",
      zIndex: 1,
    },
  });

  return (
    <>
      {/* 検索バー以外をタップした時backdropを表示 */}
      {isFocused && (
        <Pressable style={styles.backdrop} onPress={onPressBackDrop} />
      )}

      <SafeAreaView style={styles.safeArea}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          debounce={300} // debounce the requests in ms. Set to 0 to remove debounce.
          fetchDetails // whether to fetch details when you select a place, such as a precise address etc
          autoFillOnNotFound // whether to automatically fill the input on not found result
          renderDescription={(row) => row.structured_formatting.main_text} // custom description render
          textInputProps={{
            selectTextOnFocus: true,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          }}
          onPress={(data, details = null) => {
            handleOnPressSearchResult(details);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: "ja",
          }}
          styles={{
            textInput: {
              color: "#5d5d5d",
              borderRadius: 5,
              paddingHorizontal: 15,
              marginHorizontal: 15,
              shadowColor: "#000000",
              shadowRadius: 6,
              shadowOpacity: 0.2,
            },
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default GoogleMapSearchInput;
