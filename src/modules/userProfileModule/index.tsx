import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./userProfile.module.scss";
import { IProfileSubRoutes } from "@/constants/allRoutes";
import UpdatePassword from "./updatePassword";
import UpdateProfile from "./updateProfile";

const UserProfileModule = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.profileWrapper}>
      {screen === IProfileSubRoutes.UPDATE_PASSWORD ? <UpdatePassword /> : null}
      {screen === IProfileSubRoutes.UPDATE_PROFILE ? <UpdateProfile /> : null}
    </div>
  );
};

export default UserProfileModule;
