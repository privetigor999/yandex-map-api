import React from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { removeAddress } from "../../../../store/address/addressReducer";

import { IAddress } from "./../../../../types/address";

import styles from "./styles.module.scss";
import { ReactComponent as GarbageSvg } from "./../../../../assets/buttons/garbage.svg";

export const Address: React.FC<IAddress> = ({ id, title, description }) => {
  const dispatch = useAppDispatch();

  const removeAddressHandle = (id: string): void => {
    dispatch(removeAddress(id));
  };
  return (
    <div className={styles.addressBlock}>
      <div className={styles.addressInfo}>
        <h4
          className={
            title.length >= 32
              ? styles.longLengthTitle
              : styles.middleLengthTitle
          }
        >
          {title}
        </h4>
        {description && (
          <p
            className={
              description!.length >= 50
                ? styles.longLengthDescr
                : styles.middleLengthDescr
            }
          >
            {description}
          </p>
        )}
      </div>
      <button
        className={styles.garbageBtn}
        onClick={() => removeAddressHandle(id)}
      >
        <GarbageSvg className={styles.garbageSvg} />
      </button>
    </div>
  );
};
