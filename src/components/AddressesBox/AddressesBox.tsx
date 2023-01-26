import React from "react";
import { InputBox } from "./InputBox/InputBox";
import { ListOfAddresses } from "./ListOfAddresses/ListOfAddresses";

import styles from "./styles.module.scss";

export const AddressesBox: React.FC = () => {
  return (
    <div className={styles.addressesBox}>
      <InputBox />
      <ListOfAddresses />
    </div>
  );
};
