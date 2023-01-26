import React from "react";
import { fetchAddress } from "../../../../store/address/fetchAddressAction";
import { useAppDispatch } from "../../../../hooks/redux-hooks";

import styles from "./styles.module.scss";
import { ReactComponent as AddButtonSvg } from "./../../../../assets/buttons/add.svg";

export const InputField = () => {
  const dispatch = useAppDispatch();
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const focusInputRef = React.useRef<HTMLInputElement>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const clickAddButtonHandle = (): void => {
    if (searchInputValue.trim()) {
      dispatch(fetchAddress(searchInputValue));
      setSearchInputValue("");
    }
  };

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickAddButtonHandle();
    }
  };

  const clickExampleHandle = (): void => {
    setSearchInputValue("Москва, улица Новый Арбат, 1с2");
  };

  const clickSelfLocationHandle = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lon = pos.coords.longitude;
        const lat = pos.coords.latitude;
        dispatch(fetchAddress([lon, lat]));
      });
    }
  };

  React.useEffect(() => {
    focusInputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        className={styles.inputField}
        placeholder="Введите адрес..."
        ref={focusInputRef}
        value={searchInputValue}
        onChange={handleChangeInput}
        onKeyDown={keyDownHandle}
      />
      <div className={styles.addressExample}>
        Например,{" "}
        <span onClick={clickExampleHandle}>Москва, улица Новый Арбат, 1с2</span>
      </div>
      <div className={styles.currentPosition}>
        или добавить{" "}
        <span onClick={clickSelfLocationHandle}>текущее местоположение</span>
      </div>
      <button
        className={styles.addButtonBlock}
        onClick={clickAddButtonHandle}
        disabled={!searchInputValue.trim()}
      >
        <AddButtonSvg className={styles.addButtonSvg} />
      </button>
    </>
  );
};
