import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addUserChannelMappings,
  getChannelMasters,
} from "@/services/thunks/tableApis";
import MapUserTable from "./mapUserTable";
import { getUserDetails } from "@/services/thunks/loginApi";
import styles from "./mapUserChannelModule.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { IApprovedPdTypes } from "@/interfaces/product";

const MapUserChannelModule = () => {
  const [open, setOpen] = useState<any>({});
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const { channelMasters, pdType } = useAppSelector((state) => state.gateway);
  const { username: persistedUsername, userDetails } = useAppSelector(
    (state) => state.login
  );

  const keysArray =
    channelMasters && channelMasters?.length
      ? ["id", "channelid", "channelname", "description"]
      : [];

  useEffect(() => {
    dispatch(getChannelMasters());
    dispatch(getUserDetails(persistedUsername));
  }, []);

  const handleHeaderClick = (name: string) => {
    if (name === "check") {
      const allIds = channelMasters?.reduce((acc: any, curr: any) => {
        acc[curr.id] = true;
        return acc;
      }, {});

      setCurrSelectedRow(isAllChecked ? channelMasters : []);

      setOpen(isAllChecked ? allIds : {});

      setIsAllChecked((prev) => !prev);
    }
  };

  const handleRowClick = (item: any, index: number) => {
    setOpen((prev: any) => {
      return {
        ...prev,
        [item.id]: prev?.[item.id] ? false : true,
      };
    });

    if (pdType !== IApprovedPdTypes.MAPPED) {
      setCurrSelectedRow((prev) => {
        if (!Array.isArray(prev)) return [];

        const data = prev.find((prevItem) => {
          return prevItem.id === item.id;
        });

        if (!data) {
          prev = [...prev, item];
        } else {
          prev = prev.filter((prevItem) => {
            return prevItem.id !== item.id;
          });
        }

        return prev;
      });
    }
  };

  const handleMappClick = () => {
    const payload = currSelectedRow.map((item) => {
      return {
        userid: userDetails?.id,
        channelmasterid: item.id,
      };
    });

    dispatch(addUserChannelMappings(payload)).then(() => {
      toast.success("User channel mappings added successfully.");
    });
  };

  return (
    <div className={styles.mapUserChannelWrapper}>
      <Grid container>
        <Grid className={styles.mapUserChannel_inner} item sm={12} md={12}>
          <div className={styles.tableWrapper}>
            {channelMasters?.length ? (
              <MapUserTable
                handleHeaderClick={handleHeaderClick}
                handleRowClick={handleRowClick}
                open={open}
                theadArr={keysArray}
                tbodyArr={channelMasters}
              />
            ) : null}
            <div className={styles.submitBtnWrapper}>
              <Button
                onClick={() => handleMappClick()}
                className={styles.button}
                variant="contained"
                disabled={!!!currSelectedRow.length}
              >
                Map channels with users
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default MapUserChannelModule;