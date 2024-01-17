import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { FC, ReactNode } from "react";

interface GoogleMapViewProps {
  children?: ReactNode;
  currentPosition: Region;
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
}) => (
  <MapView
    mapPadding={{ top: 15, right: 0, bottom: 0, left: 0 }}
    provider={PROVIDER_GOOGLE}
    style={{ flex: 1 }}
    region={currentPosition}
    showsUserLocation
    showsMyLocationButton
  >
    {children}
  </MapView>
);

export default GoogleMapView;
