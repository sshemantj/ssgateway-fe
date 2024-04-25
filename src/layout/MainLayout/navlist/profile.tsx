import Image from "next/image";
import profileImg from "@/images/profile.png";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useState } from "react";
import LogoutModal from "@/component/molecules/LogoutModal";
import { useAppSelector } from "@/store/hooks";

interface IProfile {
  isNavOpen: boolean;
}

const Profile = (props: IProfile) => {
  const { isNavOpen } = props;
  const { userName = "" } = useAppSelector((state) => state.login.userDetails);

  const navClosedStyle: React.CSSProperties = {
    margin: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        ...{ ...(!isNavOpen ? navClosedStyle : {}) },
      }}
    >
      <Image src={profileImg} alt="profile" width={30} height={30} />
      <h4 style={{ display: isNavOpen ? "flex" : "none", fontWeight: 500 }}>
        {userName}
      </h4>
    </div>
  );
};

const ProfileList = (props: IProfile) => {
  const { isNavOpen } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const commonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "6px",
    color: "gray",
  };

  const fontStyles: React.CSSProperties = {
    fontWeight: 500,
    fontSize: 14,
    color: "#000",
  };

  return (
    <>
      <div
        style={{
          display: isNavOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={commonStyle}>
          <PermIdentityIcon color="inherit" />
          <h6 style={fontStyles}>View profile</h6>
        </div>
        <div style={commonStyle}>
          <SettingsIcon color="inherit" />
          <h6 style={fontStyles}>Setting</h6>
        </div>
        <div style={commonStyle} onClick={() => setOpenModal(true)}>
          <LogoutIcon color="inherit" />
          <h6 style={fontStyles}>Logout</h6>
        </div>
      </div>
      <LogoutModal {...{ openModal, setOpenModal }} />
    </>
  );
};

export { Profile, ProfileList };
