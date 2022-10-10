import React from "react";
import { useDropzone } from "react-dropzone";
import { IProps } from "../models/invoice.models";
import { styled } from "@mui/system";
import CustomButtonFc from "./CustomButtonFc";
import { Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../app/hooks";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import TableNoRowsOverlay from "./DataGrid/NoRowsOverlay";

type InvoiceDropzoneProps = {};

enum fileStatus {
  rdy = "rdy",
  error = "error",
  sent = "sent",
}

interface IFile {
  name: string;
  lastModified: string;
  size: string;
  type: string;
  id: number | string;
  status: fileStatus;
  hasError: boolean;
  errorDetails: string;
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
  const dispach = useAppDispatch();
  const dateFormater = new Intl.DateTimeFormat();
  const [files, setFiles] = React.useState<any[]>([]);
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

  React.useEffect(() => {
    setFiles(acceptedFiles);
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

  const columns: GridColDef[] = [
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

  const handleSentFile = (value: any) => {
    const fiundFile: File | undefined = files.find(
      (file, index) => index === value.row.id
    );
    value.row.status = "error";
  };

  const handleDeleteFile = (value: any) => {
    acceptedFiles.splice(value.row.id, 1);
    console.log("%c-ACCEPTED FILES-", "border:red solid 1px", acceptedFiles);
    setFiles([...acceptedFiles]);
    // setFiles(array);
    console.log("State FILES", files);
  };

  const actionsDefs = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (value: any) => (
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
          onClick={() => handleSentFile(value)}
          disabled={value.row.status === fileStatus.rdy}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          aria-label="send"
          color="primary"
          onClick={() => handleSentFile(value)}
          disabled={value.row.status === fileStatus.error}
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
            columns={[...columns, actionsDefs as any]}
            components={{
              NoRowsOverlay: TableNoRowsOverlay,
            }}
            componentsProps={{
              noRowsOverlay: {
                props: { message: "Table.NoRows" },
              },
            }}
            rows={files.map((item, index) => ({
              name: item.name,
              lastModified: dateFormater.format(item.lastModified),
              size: item.size,
              type: item.type,
              id: index,
              status: fileStatus.rdy,
            }))}
          ></DataGrid>
        </Grid>
      </Grid>
    </>
  );
}
