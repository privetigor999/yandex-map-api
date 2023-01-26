import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { sortListAddresses } from "../../../store/address/addressReducer";
import { Address } from "./Address/Address";

import { IAddress } from "../../../types/address";
import styles from "./styles.module.scss";

export const ListOfAddresses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { listOfAddresses } = useAppSelector((state) => state.addressReducer);

  const [
    currentAddressCard,
    setCurrentAddressCard,
  ] = React.useState<null | IAddress>(null);

  const dragStartHandle = (
    e: React.DragEvent<HTMLDivElement>,
    addressCard: IAddress
  ) => {
    setCurrentAddressCard(addressCard);
  };

  const dragLeaveHandle = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.borderColor = "#c2c2c2";
    }
  };

  const dragEndHandle = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.borderColor = "#c2c2c2";
    }
  };

  const dragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLElement) {
      e.target.style.borderColor = "#ffffff";
    }
  };

  const dropHandle = (
    e: React.DragEvent<HTMLDivElement>,
    addressCard: IAddress
  ) => {
    e.preventDefault();
    if (e.target instanceof HTMLElement) {
      e.target.style.borderColor = "#c2c2c2";
    }
    dispatch(
      sortListAddresses(
        listOfAddresses
          .map((address: IAddress) => {
            if (address.id === addressCard.id) {
              return {
                ...address,
                order: currentAddressCard!.order,
              };
            }
            if (address.id === currentAddressCard?.id) {
              return {
                ...address,
                order: addressCard!.order,
              };
            }
            return address;
          })
          .sort(sortList)
      )
    );
  };

  const sortList = (a: IAddress, b: IAddress) => {
    if (a.order! > b.order!) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className={styles.listOfAddressesBlock}>
      <h3>
        {listOfAddresses.length === 0
          ? "Здесь появится список адресов"
          : "Список адресов:"}
      </h3>

      <div className={styles.listOfAddresses}>
        {[...listOfAddresses]
          .slice()
          .sort(sortList)
          .map((address: any) => (
            <div
              onDragStart={(e) => dragStartHandle(e, address)}
              onDragLeave={(e) => dragLeaveHandle(e)}
              onDragEnd={(e) => dragEndHandle(e)}
              onDragOver={(e) => dragOverHandle(e)}
              onDrop={(e) => dropHandle(e, address)}
              key={address.id}
              draggable
            >
              <Address {...address} />
            </div>
          ))}
      </div>
    </div>
  );
};
