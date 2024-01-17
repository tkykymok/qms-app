import React, { FC, useEffect, useState } from "react";
import GoogleMapView from "../molecules/GoogleMapView";
import { Region } from "react-native-maps";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import GoogleMapSearchInput from "../molecules/GoogleMapSearchInput";
import * as Location from "expo-location";

const GoogleMapWithInputView = () => {
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

  return (
    <>
      <GoogleMapView currentPosition={currentPosition} />
      <GoogleMapSearchInput
        handleOnPressSearchResult={handleOnPressSearchResult}
      />
    </>
  );
};

export default GoogleMapWithInputView;

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
