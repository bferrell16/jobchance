import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { useTheme, makeStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Cornell from "../cornellApplicantGraph.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      maxWidth:375,
    },
  },
  media: {
    maxHeight: 500, [theme.breakpoints.down("md")]: {
        maxHeight:225,
      },
    maxWidth: 500,
  },
}));

export default function About() {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  
  return (
    <div className="App" style={{ padding: 20 }}>
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "70vh" }}
      >
        <Card raised={true} className={classes.root} >
          <CardMedia
            src={Cornell}
            className={classes.media}
            component="img"
            style={{
                display: "block",
                width: "auto",
                height: "auto",
              }}
            title="Cornell Applicant Chart"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              About
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              I made this website
              with the hopes of collecting and displaying data to give new grad
              / intern applicants expectations as to their chances at job opporotunities. I got 
              the idea from a website I used to apply for colleges (see picture).
              Currently the X axis is GPA, and the Y axis is a formula based on
              experience/school rank. The Y axis formula I hope to tweak as I get more data,
              but for now it treats FAANG/Big N as top quality internships,
              Fortune 500 companies as medium quality, any internship as ok
              quality, and no experience is a 0. Also currently all based on the
              honor system, so input data honestly please :)
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              If you happen to be interested in the code for the site, it's on
              my github: https://github.com/bferrell16 . And if you have any
              ideas for the site feel free to email me at
              ferrellbrandon1@gmail.com.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
