import EmailInput from "@/component/molecules/EmailInput";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { createUser, ICreateUserPayload } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkEmtyObj } from "@/utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { FocusEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./createUser.module.scss";

interface CreateUserProps {
  closeModal: () => void;
}

const CreateUser = ({ closeModal }: CreateUserProps) => {
  const dispatch = useAppDispatch();

  const registerUserApiResponse = useAppSelector((state) => state.register);
  const [selectedRole, setselectedRole] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [helperTextForPassword, setHelperTextForPassword] =
    useState<string>("");
  const [allinputState, setAllInputState] = useState<
    ICreateUserPayload["payload"]
  >({
    userName: "",
    password: "",
    // role: "",
    email: "",
    isactive: true,
  });
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePassWordBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (allinputState.password && !validatePassword(allinputState.password)) {
      setPasswordError(true);
      setHelperTextForPassword(
        "Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    } else {
      setPasswordError(false);
      setHelperTextForPassword("");
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (allinputState.email && !validateEmail(allinputState.email)) {
      setEmailError(true);
      setHelperText("Invalid email address");
    } else {
      setEmailError(false);
      setHelperText("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "isactive") value = JSON.parse(value);
    setAllInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // useEffect(() => {
  //   console.log("registerUserApiResponse", registerUserApiResponse);
  //   if (registerUserApiResponse) {
  //     closeModal();
  //   }
  // }, [registerUserApiResponse]);

  const handleProceed = () => {
    allinputState.role = selectedRole;
    const isEmtyFieldAvailable = checkEmtyObj(allinputState);

    if (!isEmtyFieldAvailable) {
      dispatch(createUser({ payload: allinputState }));
      // .then(() => {
      //   toast.success("User created successfully!", {
      //     position: "top-right",
      //     duration: 2000,
      //   });
      // })
      // .catch((error: any) => {
      //   toast.error(error.message || "Error while trying to register!", {
      //     position: "top-right",
      //     duration: 2000,
      //   });
      //   // dispatch(setLoader(false));
      // });
    } else {
      toast.error("Please fill all values!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  const handleRoleSelect = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setselectedRole(e.target.value);
  };

  return (
    <Box className={styles.createUser_wrapper}>
      <Grid container spacing={2} className={styles.createUser_inner}>
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          xs={12}
          md={12}
        >
          <TextField
            InputLabelProps={{
              style: { top: "-0.3rem" },
            }}
            inputProps={{
              style: {
                width: "280px",
                height: "0.4rem",
              },
            }}
            onChange={handleChange}
            value={allinputState.userName}
            name="userName"
            label="User Name"
          />
          <Box sx={{ width: "100%", maxWidth: "280px" }}>
            <TextField
              size="small"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              onBlur={handlePassWordBlur}
              required={true}
              error={passwordError}
              helperText={helperTextForPassword}
              // FormHelperTextProps={{
              //   sx: {
              //     whiteSpace: "pre-line", // Allows line breaks
              //     wordWrap: "break-word", // Break long words
              //   },
              // }}
              value={allinputState.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Box>
          <EmailInput
            value={allinputState.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={emailError}
            helperText={helperText}
          />

          {/* <TextField
            type="email"
            InputLabelProps={{
              style: { top: "-0.3rem" },
            }}
            inputProps={{
              style: {
                width: "280px",
                height: "0.4rem",
              },
            }}
            value={allinputState.email}
            name="email"
            label="Email"
            onChange={handleChange}
          /> */}
          <SelectDropdown
            handleOnChange={handleRoleSelect}
            label="Select Role"
            value={selectedRole}
            inputProps={{
              sx: {
                padding: "6px 0 6px 2.6rem",
                textAlign: "start",
              },
            }}
            selectSx={{
              width: "12rem",
              "& .MuiInputBase-input": {
                padding: "5px",
              },
              "& fieldset legend": {
                display: "none",
              },
              "& label": {
                top: "-10px",
                fontSize: "14px",
              },
              "& .MuiInputLabel-shrink": {
                top: "-4px",
                background: "#fff",
              },
            }}
            data={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Grid>

        <Grid item xs={4} width={"310px"}>
          <Button
            fullWidth
            onClick={() => handleProceed()}
            sx={{ width: "100%" }}
            variant="contained"
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
      <Toaster />
    </Box>
  );
};

export default CreateUser;
