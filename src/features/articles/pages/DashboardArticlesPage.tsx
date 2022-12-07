import React from "react";
import CardComponent, {
  CardProps,
} from "../../shared/components/CardComponent";
import { IProps } from "../models/articles.models";
import { useFeatureSettings } from "../settings";
import { usePageStyles } from "./pages.styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//test for zip
import JSZip from  'jszip';
import * as FileSaver from "file-saver";
import {getZip }  from  "../store/articles.actions"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectZip } from "../store/articles.selectors";


type DashboardPageProps = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

export default function DashboardArticlesPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  // this is only test for zip file

  /*const dispatch = useAppDispatch();
  const zip = new JSZip();
  const [value, setValue]  = React.useState("");
  const [zipData1, setZipData]  =   React.useState(useAppSelector(selectZip));

  const DownloadZip = () => {
    zip.loadAsync(zipData1).then(function (zip) {
      console.log(zip);
      Object.keys(zip.files).map((filename) => {
        zip.files[filename].async("blob").then(function (fileData) {
        FileSaver.saveAs(fileData, `${filename}`);
        });
      });
    });

    
  }

  React.useEffect(() => {
    dispatch(getZip()) 
  }, []);*/

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'column'}}>
        {/*<button onClick = {() => DownloadZip()} >XML</button>*/}
        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings.filter((card)  => card.typeOfCard  ===   "company").map((card: CardProps, index: number) => {
            return <CardComponent key={index} props={card} />;
          })}
        </div>
      </Grid>
    </Box>
  );
}

