import Image from "next/image";
import profileImg from "@/images/profile.png";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

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
      <h4 style={{ display: isNavOpen ? "flex" : "none" }}>Joseph Sr.</h4>
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
        <PersonIcon />
        <h6 style={{ fontWeight: 500, fontSize: 16 }}>View profile</h6>
      </div>
      <div style={commonStyle}>
        <SettingsIcon />
        <h6 style={{ fontWeight: 500, fontSize: 16 }}>Setting</h6>
      </div>
      <div style={commonStyle}>
        <LogoutIcon />
        <h6 style={{ fontWeight: 500, fontSize: 16 }}>Logout</h6>
      </div>
    </div>
  );
};

export { Profile, ProfileList };
