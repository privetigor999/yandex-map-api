import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchReplacePoint = createAsyncThunk(
  "address/fetchReplacePoint",
  async (params: { coords: any; id: string; order: number }, {}) => {
    try {
      const { coords, id, order } = params;
      const result = {
        title: "",
        longitude: 0,
        latitude: 0,
        description: "",
        id,
        order,
      };
      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_YANDEX_MAP_API_KEY}&format=json&geocode=${coords}&results=1`
      );
      const data =
        response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
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
