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

const drawerBleeding = 0;

interface Props {
  open: boolean;
  data: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  window?: () => Window;
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
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
          <h3>Current product: {data}</h3>
          <Grid item xs={12} style={{ gap: "1rem" }}>
            <Button
              onClick={() => handleAddProduct()}
              sx={{ padding: "0.3rem 2rem", margin: "0 0 1rem 0" }}
              variant="contained"
            >
              ADD Product
            </Button>
            <Button
              onClick={() => resetAndScanAgain()}
              sx={{
                padding: "0.4rem",
                fontSize: "0.7rem",
                margin: "0 0 1rem 0",
              }}
              variant="contained"
            >
              Reset and scan again
            </Button>
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default CustomDrawer;
