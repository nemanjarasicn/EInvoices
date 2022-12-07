/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDropzone } from "react-dropzone";
import { IFile, IProps, TableData } from "../models/invoice.models";
import { styled } from "@mui/system";
import { Box, Chip, Grid, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import TableNoRowsOverlay from "./DataGrid/NoRowsOverlay";
import { sendInvoceXml } from "../store/invoice.actions";
import { removeFile, setManyFiles } from "../store/invoice.reducer";
import { selectAllFiles } from "../store/invoice.selectors";
import { useComponentsStyles } from "./components.styles";
import { useTranslation } from "react-i18next";
import { FileStatus } from "../models";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export type InvoiceDropzoneProps = {
  title: string;
  rejectedTitle: string;
  dropzonePlaceholder: string;
  dropzoneError: string;
  cardErrorLabels: any;
};

const getColor = (props: {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff0000";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props as any)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: 200px;
  justify-content: center;
`;

export default function InvoiceDropzoneComponent({
  props,
}: IProps<InvoiceDropzoneProps>) {
  const { dropzoneComponent } = useComponentsStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const files: TableData<IFile>[] = useAppSelector(selectAllFiles);
  /**
   * useDropzone lib
   */
  const {
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    accept: {
      "text/xml": [".xml"],
    },
  });

  const [rejectedFiles, setRejectedFiles] = React.useState<any[]>([]);
  const [fileError, setFileError] = React.useState<IFile | null>(null);
  const dateFormater = new Intl.DateTimeFormat();

  React.useEffect(() => {
    dispatch(
      setManyFiles(
        acceptedFiles.map((item, index) => ({
          name: item.name,
          lastModified: dateFormater.format(item.lastModified),
          size: item.size,
          type: item.type,
          id: index,
          status: FileStatus.PREPARED,
          error: null,
        }))
      )
    );
    setFileError(null);
  }, [acceptedFiles]);

  React.useEffect(() => {
    setRejectedFiles([...fileRejections]);
  }, [fileRejections]);

  /**
   * Handle Send Action
   * @param value GridRenderCellParams
   */
  const handleSendFile = (value: GridRenderCellParams) => {
    setFileError(null);
    const foundFile: File | undefined = acceptedFiles.find(
      (file) => file.name === value.row.name
    );
    if (foundFile) {
      dispatch(sendInvoceXml({ file: foundFile, id: value.row.name }));
    }
  };

  /**
   * Handle Delete Action
   * @param value GridRenderCellParams
   */
  const handleDeleteFile = (value: GridRenderCellParams) => {
    setFileError(null);
    acceptedFiles.splice(
      acceptedFiles.findIndex((item) => item.name === value.row.name),
      1
    );
    dispatch(removeFile(value.row.name));
  };

  /**
   * Columns Definition
   */
  const columnsDef: GridColDef[] = [
    {
      field: "name",
      headerName: t("FileTable.Filename"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastModified",
      headerName: t("FileTable.Modification"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "size",
      headerName: t("FileTable.Size"),
      maxWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "type",
      headerName: t("FileTable.Type"),
      maxWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "status",
      headerName: t("FileTable.SendStatus"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (value: any) => {
        switch (value.row.status) {
          case FileStatus.PREPARED:
            return (
              <Chip
                variant="outlined"
                color="info"
                size="small"
                label={`${t(FileStatus.PREPARED)}`}
              />
            );
          case FileStatus.HAS_ERROR:
            return (
              <Chip
                variant="outlined"
                color="error"
                size="small"
                label={`${t(FileStatus.HAS_ERROR)}`}
              />
            );
          case FileStatus.ACCEPTED:
            return (
              <Chip
                variant="outlined"
                color="success"
                size="small"
                label={`${t(FileStatus.ACCEPTED)}`}
              />
            );
          default:
            return value.row.status;
        }
      },
    },
  ];
  const actionsDefs: GridColDef = {
    field: "actions",
    headerName: "",
    width: 200,
    headerAlign: "center",
    align: "center",
    sortable: false,
    renderCell: (value: GridRenderCellParams) => (
      <>
        <IconButton
          aria-label="send"
          color="primary"
          onClick={() => handleDeleteFile(value)}
        >
          <DeleteForeverIcon />
        </IconButton>
        <IconButton
          aria-label="send"
          color="error"
          onClick={() => setFileError(value.row)}
          disabled={value.row.status !== FileStatus.HAS_ERROR}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          aria-label="send"
          color="primary"
          onClick={() => handleSendFile(value)}
          disabled={
            value.row.status === FileStatus.HAS_ERROR ||
            value.row.status === FileStatus.ACCEPTED
          }
        >
          <SendIcon />
        </IconButton>
      </>
    ),
  };

  return (
    <>
      <Grid container spacing={2} style={dropzoneComponent.container}>
        <Grid style={dropzoneComponent.title} item xs={9}>
          <h3>{t(props.title)}</h3>
        </Grid>
        {rejectedFiles.length > 0 && (
          <Grid
            item
            xs={3}
            sx={{ scale: "0.7" }}
            style={dropzoneComponent.title}
          >
            <h3>{t(props.rejectedTitle)}</h3>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Container
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>{t(props.dropzonePlaceholder)}</p>
          </Container>
        </Grid>
        <Grid item xs={3} style={{ maxHeight: "215px" }}>
          {rejectedFiles.length > 0 && (
            <Box sx={dropzoneComponent.errorCard.wrapper}>
              <Paper elevation={8} style={dropzoneComponent.errorCard.card}>
                <div style={dropzoneComponent.centredBadgeButton.wrapper}>
                  <IconButton
                    aria-label="close"
                    color="primary"
                    onClick={() => setRejectedFiles([])}
                    style={dropzoneComponent.centredBadgeButton.button}
                  >
                    <CancelRoundedIcon />
                  </IconButton>
                </div>
                <ul
                  className="rejected"
                  style={dropzoneComponent.rejectedFiles}
                >
                  {rejectedFiles.map(({ file, errors }) => (
                    <li key={(file as any).path}>
                      <span style={{ fontWeight: "bold" }}>
                        {(file as any).path}
                      </span>{" "}
                      - {file.size} bytes
                      <ul>
                        {errors.map(
                          (e: { code: React.Key | null | undefined }) => (
                            <li style={{ color: "red" }} key={e.code}>
                              {t(`SalesTemplatePage.${e.code}`)}
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Box>
          )}
        </Grid>
        <Grid container spacing={2} style={dropzoneComponent.wrapDivider}>
          <Grid style={dropzoneComponent.divider} item xs={9}></Grid>
          {/* {fileError && ( */}
          <Grid
            item
            xs={3}
            // sx={{ scale: "0.9" }}
            // style={dropzoneComponent.title}
          >
            {/* <h3>{t(props.invoiceErrorTitle)}</h3> */}
          </Grid>
          {/* )} */}
        </Grid>
        <Grid item xs={9}>
          <DataGrid
            autoHeight
            disableColumnMenu
            disableColumnFilter
            showCellRightBorder={true}
            density="compact"
            columns={[...columnsDef, actionsDefs]}
            components={{
              NoRowsOverlay: TableNoRowsOverlay,
              Pagination: null,
            }}
            componentsProps={{
              noRowsOverlay: {
                props: { message: "Table.NoRows" },
              },
            }}
            rows={files}
            localeText={{
              footerRowSelected: () => ``,
            }}
          ></DataGrid>
        </Grid>
        <Grid item xs={3}>
          {fileError && files.length > 0 && (
            <Box sx={dropzoneComponent.errorCard.wrapper}>
              <Paper elevation={8} style={dropzoneComponent.errorCard.card}>
                <div style={dropzoneComponent.centredBadgeButton.wrapper}>
                  <IconButton
                    aria-label="close"
                    color="primary"
                    onClick={() => setFileError(null)}
                    style={dropzoneComponent.centredBadgeButton.button}
                  >
                    <CancelRoundedIcon />
                  </IconButton>
                </div>
                <span style={dropzoneComponent.bold}>
                  {t(props.cardErrorLabels.title)}
                </span>
                <span style={dropzoneComponent.bold}>
                  {t(props.cardErrorLabels.fileName)}
                </span>
                <li style={dropzoneComponent.errorText}>{fileError.name}</li>
                <span style={dropzoneComponent.bold}>
                  {t(props.cardErrorLabels.errorCode)}
                </span>
                <li style={dropzoneComponent.errorText}>
                  {fileError.error?.ErrorCode}
                </li>
                <span style={dropzoneComponent.bold}>
                  {t(props.cardErrorLabels.fieldName)}
                </span>
                <li style={dropzoneComponent.errorText}>
                  {fileError.error?.FieldName}
                </li>
                <span style={dropzoneComponent.bold}>
                  {`${t(props.cardErrorLabels.errorMessage)}`}
                </span>
                <li style={dropzoneComponent.errorText}>
                  {fileError.error?.Message}
                </li>
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
