import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { toggleErrorFindedAddress } from "../../../../store/address/addressReducer";

import styles from "./styles.module.scss";
import retryPng from "./../../../../assets/buttons/retry.png";

export const ErrorAddress: React.FC = () => {
  const dispatch = useAppDispatch();
  const { errorTextAddress } = useAppSelector((state) => state.addressReducer);

  const handleToggleError = (): void => {
    dispatch(toggleErrorFindedAddress(false));
  };
  return (
    <div className={styles.errorBlock}>
      <p>
        По запросу <span>{errorTextAddress}</span> ничего не найдено. Попробуйте
        ввести другой адрес
      </p>

      <button className={styles.retryBtn} onClick={handleToggleError}>
        <img className={styles.retryImg} src={retryPng} alt="retry" />
      </button>
    </div>
  );
};
