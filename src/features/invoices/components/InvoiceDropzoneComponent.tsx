import React from "react";
import { useDropzone } from "react-dropzone";
import { IProps } from "../models/invoice.models";
import { styled } from "@mui/system";
import CustomButtonFc from "./CustomButtonFc";
import { Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import TableNoRowsOverlay from "./DataGrid/NoRowsOverlay";
import { sendInvoceXml } from "../store/invoice.actions";
import { removeFile, setManyFiles } from "../store/invoice.reducer";
import { selectAllFiles } from "../store/invoice.selectors";

type InvoiceDropzoneProps = {};

export interface IFile {
  name: string;
  lastModified: string;
  size: number;
  type: string;
  id: number | string;
  status: FileStatus;
  error: IErrorFile | null;
}
export interface IErrorFile {
  ErrorCode: string;
  FieldName: string;
  Message: string;
}

export enum FileStatus {
  PREPARED = "rdy",
  HAS_ERROR = "error",
  SENT = "sent",
  ACCEPTED = "accepted",
}

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
  const dispatch = useAppDispatch();
  const files: IFile[] = useAppSelector(selectAllFiles);
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
  }, [acceptedFiles]);

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={(file as any).path}>
      {(file as any).path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  /**
   * Handle Send Action
   * @param value GridRenderCellParams
   */
  const handleSendFile = (value: GridRenderCellParams) => {
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
    acceptedFiles.splice(
      acceptedFiles.findIndex((item) => item.name === value.row.name),
      1
    );
    dispatch(removeFile(value.row.name));
  };

  const columnsDef: GridColDef[] = [
    { field: "name", headerName: "File name", flex: 1 },
    {
      field: "lastModified",
      headerName: "Last modification",
      flex: 1,
    },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "type", headerName: "type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const actionsDefs: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
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
          color="info"
          onClick={() => handleSendFile(value)}
          disabled={value.row.status === FileStatus.PREPARED}
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
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h3>Ucitaj XML datoteku</h3>
        </Grid>
        <Grid item xs={4}>
          <h3>Rejected files</h3>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Container
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </Container>

          <CustomButtonFc
            soloButton={{
              title: "InvoiceCard.preview",
              disabled: false,
              btnFn: () => console.log("File", acceptedFiles),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <aside id="rejected_container">
            <ul>{fileRejectionItems}</ul>
          </aside>
        </Grid>
        <Grid item xs={8}>
          <DataGrid
            autoHeight
            density="compact"
            columns={[...columnsDef, actionsDefs]}
            components={{
              NoRowsOverlay: TableNoRowsOverlay,
            }}
            componentsProps={{
              noRowsOverlay: {
                props: { message: "Table.NoRows" },
              },
            }}
            rows={files}
          ></DataGrid>
        </Grid>
      </Grid>
    </>
  );
}
