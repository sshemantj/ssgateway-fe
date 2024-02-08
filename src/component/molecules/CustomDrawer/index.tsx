import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Grid } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/slices/processSlice";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import styles from "./customDrawer.module.scss";
import { Html5QrcodeScanner } from "html5-qrcode";

const drawerBleeding = 0;

interface Props {
  open: boolean;
  data: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  window?: () => Window;
  camRef: React.MutableRefObject<Html5QrcodeScanner | null>;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const CustomDrawer = (props: Props) => {
  const { window, open, setOpen, data, setCurrentText } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClose = () => () => {
    props.camRef.current?.resume();
    setOpen(false);
  };

  const onOpen = () => () => {
    setOpen(true);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleAddProduct = () => {
    setCurrentText("");
    dispatch(addProduct({ id: data, name: data }));
    router.push(processScreenRoutes.PROCESS_SCANNED_ITEM_SCREEN);
  };

  const resetAndScanAgain = () => {
    setCurrentText("");
    props.camRef.current?.resume();
    setOpen(false);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose()}
        onOpen={onOpen()}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <div className={styles.customDrawerContainer}>
            <div className={styles.drawerInner}>
              <h3 className={styles.pdName}>Current product: {data}</h3>
              <div className={styles.btnWrapper}>
                <Button
                  className={styles.addProductBtn}
                  onClick={() => handleAddProduct()}
                  variant="contained"
                >
                  ADD Product
                </Button>
                <Button
                  className={styles.resetAndScanAgain}
                  onClick={() => resetAndScanAgain()}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default CustomDrawer;
