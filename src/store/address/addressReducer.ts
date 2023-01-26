import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddress } from "./fetchAddressAction";
import { IAddress, IState } from "../../types/address";
import { fetchReplacePoint } from "./fetchReplacePoint";

const initialState: IState = {
  listOfAddresses: [],
  status: "idle",
  errorMessage: null,
  isErrorFindedAddress: false,
  errorTextAddress: "",
  count: 0,
  prevLength: 0,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    removeAddress: (state, action: PayloadAction<IAddress["id"]>) => {
      state.listOfAddresses = state.listOfAddresses.filter(
        (address: IAddress) => address.id !== action.payload
      );
      state.prevLength--;
    },
    sortListAddresses: (state, action: PayloadAction<IAddress[]>) => {
      state.listOfAddresses = action.payload;
    },
    toggleErrorFindedAddress: (
      state,
      action: PayloadAction<IState["isErrorFindedAddress"]>
    ) => {
      state.isErrorFindedAddress = action.payload;
      state.errorTextAddress = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAddress.fulfilled,
        (
          state: Omit<IState, "errorMessage">,
          action: PayloadAction<IAddress | any>
        ) => {
          if (action.payload[0] === null) {
            state.isErrorFindedAddress = true;
            state.errorTextAddress = action.payload[1];
          }
          if (action.payload[0] !== null) {
            state.count++;
            state.listOfAddresses.push({
              ...action.payload,
              order: state.count,
            });
          }
          state.prevLength++;
          state.status = "success";
        }
      )
      .addCase(
        fetchReplacePoint.fulfilled,
        (
          state: Pick<IState, "listOfAddresses" | "status">,
          action: AnyAction
        ) => {
          const findedIndex = state.listOfAddresses.findIndex(
            (address: IAddress) => address.id === action.payload.id
          );
          state.listOfAddresses[findedIndex] = action.payload;
          state.status = "success";
        }
      )
      .addMatcher(isLoading, (state) => {
        state.status = "loading";
        state.isErrorFindedAddress = false;
        state.errorMessage = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.status = "error";
      });
  },
});

function isLoading(action: AnyAction) {
  return action.type.endsWith("pending");
}

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const {
  removeAddress,
  sortListAddresses,
  toggleErrorFindedAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
