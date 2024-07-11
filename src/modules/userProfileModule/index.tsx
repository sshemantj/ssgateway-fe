import { useSearchParams } from "next/navigation";
import styles from "./userProfile.module.scss";

const UserProfileModule = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.profileWrapper}>
      <p>user profile old</p>
      {/* {screen === IProfileSubRoutes.UPDATE_PASSWORD ? <UpdatePassword /> : null}
      {screen === IProfileSubRoutes.UPDATE_PROFILE ? <UpdateProfile /> : null} */}
    </div>
  );
};

export default UserProfileModule;
