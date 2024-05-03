import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./shadowBox.module.scss";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: any;
}

const ShadowBox = (props: IProps) => {
  const { className, children = "", ...rest } = props;
  return (
    <div className={`${styles.shadowBox} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default ShadowBox;
