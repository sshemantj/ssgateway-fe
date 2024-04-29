import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addUserChannelMappings,
  getChannelMasters,
} from "@/services/thunks/tableApis";
import MapUserTable from "./mapUserTable";
import { getUserDetails } from "@/services/thunks/loginApi";
import toast, { Toaster } from "react-hot-toast";
import { IApprovedPdTypes } from "@/interfaces/product";
import styles from "./mapUserChannelModule.module.scss";

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
      toast.success("User channel mappings added successfully.", {
        position: "top-right",
        duration: 2000,
      });
    });
  };

  return (
    <div className={styles.mapUserChannelWrapper}>
      <Grid container>
        <Grid className={styles.mapUserChannel_inner} item sm={12} md={12}>
          <div
            className={`${styles.tableWrapper} ${
              channelMasters?.length || styles.alignCenter
            }`}
          >
            {channelMasters?.length ? (
              <>
                <MapUserTable
                  handleHeaderClick={handleHeaderClick}
                  handleRowClick={handleRowClick}
                  open={open}
                  theadArr={keysArray}
                  tbodyArr={channelMasters}
                />
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
              </>
            ) : (
              <h2>No channels found</h2>
            )}
          </div>
        </Grid>
      </Grid>
      <Toaster />
    </div>
  );
};

export default MapUserChannelModule;
