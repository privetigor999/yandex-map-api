import React from "react";
import { BarLoader } from "react-spinners";

import styles from "./styles.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <BarLoader color="#c2c2c2" height={2} width={"96%"} />
    </div>
  );
};
