import Image from "next/image";
import profileImg from "@/images/profile.png";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

interface IProfile {
  isNavOpen: boolean;
}

const Profile = (props: IProfile) => {
  const { isNavOpen } = props;
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
        Joseph Sr.
      </h4>
    </div>
  );
};

const ProfileList = (props: IProfile) => {
  const { isNavOpen } = props;

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
      <div style={commonStyle}>
        <LogoutIcon color="inherit" />
        <h6 style={fontStyles}>Logout</h6>
      </div>
    </div>
  );
};

export { Profile, ProfileList };
