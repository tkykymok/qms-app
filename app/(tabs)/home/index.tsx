import { Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { Marker, Region } from "react-native-maps";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import GoogleMapView from "../../../components/molecules/GoogleMapView";
import GoogleMapSearchInput from "../../../components/molecules/GoogleMapSearchInput";
import * as Location from "expo-location";
import { Store } from "../../../model/store";
import StoreDetailBottomSheet from "../../../components/molecules/StoreDetailBottomSheet";

const Index = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // 現在地
  const [currentPosition, setCurrentPosition] = useState<Region>({
    latitude: 35.685175,
    longitude: 139.7502246,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  useEffect(() => {
    // 現在地の取得
    getCurrentLocation().then((location) => {
      setCurrentPosition({
        latitude: location!.coords.latitude,
        longitude: location!.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    });
  }, []);

  const handleOnPressSearchResult = (details: GooglePlaceDetail | null) => {
    // 検索結果をタップした時の処理
    if (details) {
      const newRegion = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.027,
        longitudeDelta: 0.027,
      };
      setCurrentPosition(newRegion);
    }
  };

  const locations: {
    id: number;
    latitude: number;
    longitude: number;
  }[] = [{ id: 1, latitude: 35.685175, longitude: 139.7502246 }];

  return (
    <>
      {/* GoogleMap */}
      <GoogleMapView currentPosition={currentPosition} setStores={setStores}>
        {stores &&
          stores.map((store) => (
            <Marker
              key={store.storeId}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              onPress={() => {
                setSelectedStore(store);
                bottomSheetRef.current?.expand();
              }}
            />
          ))}
      </GoogleMapView>
      <GoogleMapSearchInput
        handleOnPressSearchResult={handleOnPressSearchResult}
      />

      {/* BottomSheet 店舗詳細 */}
      <StoreDetailBottomSheet
        store={selectedStore}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};

export default Index;

/**
 * 現在地の取得
 */
async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // 許可が得られなかった場合の処理
    return;
  }

  return await Location.getCurrentPositionAsync({});
}
