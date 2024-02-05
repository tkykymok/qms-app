import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Store } from "../../model/store";
import StoreUsecase from "../../usecase/storeUsecase";
import { Dispatch, SetStateAction } from "react";

// interface GoogleMapViewProps {
//   children?: ReactNode;
//   currentPosition: Region;
// }

export interface GoogleMapViewProps {
  children?: ReactNode;
  currentPosition: Region;
  setStores: Dispatch<SetStateAction<Store[]>>;
}

/**
 * GoogleMapView
 * @param children
 * @param currentPosition
 * @constructor
 */
const GoogleMapView: FC<GoogleMapViewProps> = ({
  children,
  currentPosition,
  setStores,
}) => {
  const [region, setRegion] = useState(currentPosition);

  const storeFetcher = (latitude: number, longitude: number): Promise<any> => {
    return StoreUsecase.getStore(latitude, longitude);
  };

  // const handleRegionChange = (region: Region) => {
  //   storeFetcher(region.latitude, region.longitude).then((data) => {
  //     setStores(data);
  //     console.log(data);
  //   });
  // };

  // const handleRegionChange = (region: Region) => {
  //   storeFetcher(region.latitude, region.longitude)
  //     .then((data) => {
  //       // レスポンスから `stores` 配列を取得してセットする
  //       if (data && Array.isArray(data.stores)) {
  //         setStores(data.stores);
  //         console.log(data.stores);
  //       } else {
  //         console.error("Received data is not in expected format", data);
  //         setStores([]); // データ形式が予期されたものでない場合は空の配列を設定
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching stores:", error);
  //       setStores([]); // エラーが発生した場合は空の配列を設定
  //     });
  // };

  // useEffect(() => {
  //   storeFetcher(region.latitude, region.longitude)
  //     .then((data) => {
  //       if (data && Array.isArray(data.stores)) {
  //         setStores(data.stores);
  //       } else {
  //         console.error("Received data is not in expected format", data);
  //         setStores([]); // データ形式が予期されたものでない場合は空の配列を設定
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching stores:", error);
  //       setStores([]); // エラーが発生した場合は空の配列を設定
  //     });
  // }, [region]); // 依存配列に region を含める

  const updateStores = (latitude: number, longitude: number) => {
    storeFetcher(latitude, longitude)
      .then((data) => {
        if (data && Array.isArray(data.stores)) {
          setStores(data.stores);
          console.log(data.stores);
        } else {
          setStores([]); // データ形式が予期されたものでない場合は空の配列を設定
        }
      })
      .catch((error) => {
        setStores([]); // エラーが発生した場合は空の配列を設定
      });
  };

  const handleRegionChange = (region: Region) => {
    updateStores(region.latitude, region.longitude);
  };

  useEffect(() => {
    updateStores(region.latitude, region.longitude);
  }, [region]); // 依存配列に region を含める

  return (
    <MapView
      mapPadding={{ top: 15, right: 0, bottom: 0, left: 0 }}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={currentPosition}
      showsUserLocation
      showsMyLocationButton
      onRegionChangeComplete={handleRegionChange}
    >
      {children}
    </MapView>
  );
};

export default GoogleMapView;
