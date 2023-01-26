import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import uuid from "react-uuid";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (place: string | number[]) => {
    try {
      const result = {
        title: "",
        longitude: 0,
        latitude: 0,
        description: "",
        id: uuid(),
      };
      const responseFetch = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_YANDEX_MAP_API_KEY}&format=json&geocode=${place}&results=1`
      );

      if (
        responseFetch.data.response.GeoObjectCollection.featureMember.length ===
        0
      ) {
        return [null, place];
      }
      const data =
        responseFetch.data.response.GeoObjectCollection.featureMember[0]
          .GeoObject;

      result.title = data.name;
      const coordinates = data.Point.pos.split(" ");
      result.longitude = +coordinates[0];
      result.latitude = +coordinates[1];
      if (data.description) {
        result.description = data.description;
      }
      return result;
    } catch (e) {
      return (e as AxiosError).message;
    }
  }
);
