import React, { useEffect, useState } from "react";
import EditableTable from "@/component/molecules/EditableTable";
import {
  GridColDef,
  GridPreProcessEditCellProps,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getChannelMasters,
  updateChannelMaster,
} from "@/services/thunks/tableApis";
import { Button } from "@mui/material";
import styles from "./updateChannel.module.scss";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 120,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "channelid",
    headerName: "Channelid",
    type: "string",
    width: 200,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "channelname",
    headerName: "Channel Name",
    type: "string",
    width: 200,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 250,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  // {
  //   field: "isactive",
  //   headerName: "is Active",
  //   type: "string",
  //   width: 180,
  //   editable: true,
  //   align: "center",
  //   headerAlign: "center",
  // },
];

const UpdateChannel = () => {
  const { channelMasters } = useAppSelector((state) => state.gateway);
  const [tableColumns, setTableColumns] = useState<GridColDef[]>();
  const [tableRows, setTableRows] = useState<GridRowsProp>();
  const [updatedRowsList, setUpdatedRowsList] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<GridRowsProp>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChannelMasters());
    const tableColumnList = columns.map((item) => {
      item.preProcessEditCellProps = function (
        params: GridPreProcessEditCellProps
      ) {
        const id = params.id;
        const key = this.field;
        const value = params.props.value;
        const updatedRows = tableRows?.map((item) => {
          if (item.id === id) {
            item[key] = value;
          }
          return item;
        });
        setFormValues(updatedRows);
        return { ...params.props };
      };
      return item;
    });
    setTableColumns(tableColumnList);
  }, []);

  useEffect(() => {
    const finalTableColumns = Array.isArray(channelMasters)
      ? channelMasters.map(
          ({ id, channelid, channelname, description, isactive }) => {
            return {
              id,
              channelid,
              channelname,
              description,
              // isactive,
            };
          }
        )
      : [];
    setTableRows(finalTableColumns);
    setFormValues(finalTableColumns);
  }, [channelMasters]);

  const processRowUpdate = (updatedRow: any, originalRow: any) => {
    setUpdatedRowsList((prev) => {
      const filteredItem = prev.filter((item) => item.id !== updatedRow.id);
      const isAlreadyExist = filteredItem.length !== prev.length;
      if (isAlreadyExist) {
        const currObj = prev.find((item) => item.id === updatedRow.id);
        Object.keys(currObj).forEach((key) => {
          const currKeysValue = currObj[key];
          const changedKeysValue = updatedRow[key];
          const originalKeyValue = originalRow[key];
          if (
            currKeysValue !== changedKeysValue &&
            originalKeyValue !== changedKeysValue
          ) {
            currObj[key] = changedKeysValue;
          }
        });
        filteredItem.push(currObj);
        return filteredItem;
      } else {
        return [...prev, updatedRow];
      }
    });
  };

  const handleSubmit = () => {
    console.log("updatedRowsList", updatedRowsList);
    updatedRowsList.forEach((item) => {
      dispatch(updateChannelMaster({ payload: item }));
    });
  };

  return (
    <div className={styles.updateChannel_wrapper}>
      {tableRows && tableColumns ? (
        <>
          <EditableTable
            style={{ maxHeight: 250 }}
            processRowUpdate={processRowUpdate}
            columns={tableColumns}
            rows={tableRows}
          />
          <div className={styles.submitBtnWrapper}>
            <Button onClick={() => handleSubmit()} variant="contained">
              Submit
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UpdateChannel;
