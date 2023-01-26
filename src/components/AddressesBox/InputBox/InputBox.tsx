import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { InputField } from "./InputField/InputField";

import styles from "./styles.module.scss";
import { Loader } from "./Loader/Loader";
import { ErrorAddress } from "./ErrorAddress/ErrorAddress";

export const InputBox: React.FC = () => {
  const { status, isErrorFindedAddress } = useAppSelector(
    (state) => state.addressReducer
  );

  return (
    <div className={styles.inputFieldBlock}>
      {isErrorFindedAddress ? <ErrorAddress /> : <InputField />}
      {status === "loading" && <Loader />}
    </div>
  );
};
