import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { FC } from "react";

interface GoogleMapViewProps {
  currentPosition: Region;
}

/**
 * GoogleMapView
 * @param currentPosition
 * @constructor
 */
const GoogleMapView: FC<GoogleMapViewProps> = ({ currentPosition }) => (
  <MapView
    mapPadding={{ top: 15, right: 0, bottom: 0, left: 0 }}
    provider={PROVIDER_GOOGLE}
    style={{ flex: 1 }}
    region={currentPosition}
    showsUserLocation
    showsMyLocationButton
  />
);

export default GoogleMapView;
