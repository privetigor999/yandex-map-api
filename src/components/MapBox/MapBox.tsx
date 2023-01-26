import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  Polyline,
} from "react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchReplacePoint } from "../../store/address/fetchReplacePoint";

import { IAddress } from "../../types/address";

import styles from "./styles.module.scss";
import placemarkPng from "./../../assets/placemark.png";

export const MapBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const [centerMap, setCenterMap] = React.useState({
    center: [55.731574, 37.613856],
    zoom: 10,
  });
  const { listOfAddresses, isErrorFindedAddress, prevLength } = useAppSelector(
    (state) => state.addressReducer
  );
  const mapRef = React.useRef<any>(null);
  const setMapRef = React.useCallback((instance: React.Ref<any>) => {
    mapRef.current = instance;
  }, []);

  const replacePoint = (e: any, id: string, order: number) => {
    const coordinates = e
      .get("target")
      .geometry.getCoordinates()
      .reverse();
    dispatch(fetchReplacePoint({ coords: coordinates, id, order }));
  };

  const sortList = (a: IAddress, b: IAddress) => {
    if (a.order! > b.order!) {
      return 1;
    } else {
      return -1;
    }
  };

  React.useEffect(() => {
    if (listOfAddresses.length === 0) {
      setCenterMap({
        center: [55.731574, 37.613856],
        zoom: 10,
      });
      return;
    }
    if (listOfAddresses.length === prevLength && !isErrorFindedAddress) {
      setCenterMap({
        center: [
          listOfAddresses[listOfAddresses.length - 1].latitude,
          listOfAddresses[listOfAddresses.length - 1].longitude,
        ],
        zoom: 11,
      });
    }
  }, [prevLength]);
  return (
    <div className={styles.mapbox}>
      <YMaps
        query={{
          apikey: process.env.REACT_APP_YANDEX_MAP_API_KEY,
          lang: "ru_RU",
        }}
      >
        <Map
          state={centerMap}
          width="100%"
          height="100%"
          instanceRef={setMapRef}
          modules={["multiRouter.MultiRoute"]}
        >
          {[...listOfAddresses]
            .slice()
            .sort(sortList)
            .map((address) => (
              <Placemark
                key={address.id}
                geometry={[address.latitude, address.longitude]}
                onDragEnd={(e: any) =>
                  replacePoint(e, address.id, address.order!)
                }
                options={{
                  iconLayout: "default#image",
                  iconImageHref: placemarkPng,
                  iconImageSize: [40, 40],
                  iconImageOffset: [-21, -40],
                  draggable: true,
                  iconContent: "+",
                }}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                properties={{
                  hintContent: address.description,
                  balloonContent: address.title,
                }}
              />
            ))}
          <Polyline
            geometry={[...listOfAddresses]
              .slice()
              .sort(sortList)
              .map((address) => [address.latitude, address.longitude])}
            options={{
              balloonCloseButton: false,
              strokeColor: "#50655e",
              strokeWidth: 4,
              strokeOpacity: 0.9,
            }}
          />
          <ZoomControl />
        </Map>
      </YMaps>
    </div>
  );
};
