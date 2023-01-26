export interface IAddress {
  id: string;
  title: string;
  longitude: number;
  latitude: number;
  order: number;
  description?: string;
}

export interface IState {
  listOfAddresses: IAddress[];
  status: "success" | "loading" | "error" | "idle";
  errorMessage: string | null;
  count: number;
  isErrorFindedAddress: boolean;
  errorTextAddress: string;
  prevLength: number;
}
