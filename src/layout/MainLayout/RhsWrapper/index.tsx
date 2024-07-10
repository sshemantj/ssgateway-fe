import ModalComponent from "@/component/molecules/ModalComponent";
import CreateUser from "@/modules/userProfileModule/createUser";
import UpdatePassword from "@/modules/userProfileModule/updatePassword";
import UpdateProfile from "@/modules/userProfileModule/updateProfile";
import { useAppSelector } from "@/store/hooks";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./rhsWrapper.module.scss";

const RhsWrapper = () => {
  // const userId = useAppSelector((state) => state.login.userDetails?.id);

  const userRole =
    useAppSelector((state) => state?.login?.userDetails?.role) || "";

  const isAdmin = userRole === "admin";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
    handlePopoverClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalTitle("");
    setModalContent(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={styles.rhs_Wrapper}>
      <IconButton
        // onClick={handlePopoverOpen}
        className={styles.notificatin_container}
      >
        <NotificationsNoneIcon color="inherit" />
      </IconButton>

      <IconButton
        disabled={!isAdmin}
        onClick={handlePopoverOpen}
        className={styles.profile_container}
      >
        <PermIdentityIcon color="inherit" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ cursor: "pointer", mb: 1 }}
            onClick={() =>
              handleModalOpen(
                "Create User",
                <CreateUser closeModal={handleModalClose} />
              )
            }
          >
            Create User
          </Typography>
          <Typography
            sx={{ cursor: "pointer", mb: 1 }}
            onClick={() =>
              handleModalOpen(
                "Update Password",
                <UpdatePassword closeModal={handleModalClose} />
              )
            }
          >
            Update Password
          </Typography>
          <Typography
            sx={{ cursor: "pointer", mb: 1 }}
            onClick={() =>
              handleModalOpen(
                "Update Profile",
                <UpdateProfile closeModal={handleModalClose} />
              )
            }
          >
            Update Profile
          </Typography>
        </Box>
      </Popover>
      <ModalComponent
        open={modalOpen}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalContent}
      </ModalComponent>
    </div>
  );
};

export default RhsWrapper;
