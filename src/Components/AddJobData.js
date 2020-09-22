import React from "react";
import { useForm } from "react-hook-form";
import firestore from "./Firestore";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  Select,
} from "@material-ui/core";

//figure out how to clear form after submit
export default function AddJobData(props) {
  const { register, handleSubmit, reset } = useForm();

  const addJobData = firestore.functions().httpsCallable("addJobData");
  const onAdd = (data) => {
    if (
      data.outcome !== "empty" &&
      data.classYear !== "empty" &&
      data.numExperience !== "empty" &&
      data.Experience !== "empty" &&
      data.gpa !== "empty" &&
      data.school !== "empty" 
    ) {
      addJobData({
        jobKey: props.jobKey,
        gpa: data.gpa,
        school: data.school,
        outcome: data.outcome,
        experience: data.experience,
        classYear: data.classYear,
        numExperience: data.numExperience,
      });
      reset(); //reset the form
    } else {
      console.log("LEFT REQUIRED FIELD EMPTY");
    }
  };

  //data basically gonna be at 3 different clumps cuz the experience calculation is
  //not complex, need to add something to make it more continuous
  return (
    <div className="App" style={{ padding: 10 }}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "20vh" }}
      >
        <Grid item>
          <Typography variant="body2" margin={5} align="left">
            Have you applied for this role? Submit your outcome below.
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <form onSubmit={handleSubmit(onAdd)}>
            <FormControl required style={{ margin: "5px" }}>
              <Select
                native
                defaultValue="empty"
                variant="outlined"
                id="outcome"
                name="outcome"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="ghosted" value="ghosted">
                  Ghosted
                </option>
                <option key="rejected" value="rejected">
                  Rejected
                </option>
                <option key="hadAnInterview" value="hadAnInterview">
                  Had an interview
                </option>
                <option key="offer" value="offer">
                  Recieved an offer
                </option>
              </Select>
              <FormHelperText>Application Status</FormHelperText>
            </FormControl>
            <FormControl required style={{ margin: "5px" }}>
              <Select
                native
                defaultValue="empty"
                variant="outlined"
                id="school"
                name="school"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="10" value="10">
                  Top 10
                </option>
                <option key="25" value="25">
                  Top 25
                </option>
                <option key="50" value="50">
                  Top 50
                </option>
                <option key="100" value="100">
                  Top 100
                </option>
                <option key="250" value="250">
                  Top 250
                </option>
                <option key="1000" value="1000">
                  Over 250th
                </option>
              </Select>
              <FormHelperText>Approximate university rank</FormHelperText>
            </FormControl>
            <FormControl required style={{ margin: "5px", minWidth: "100px" }}>
              <Select
                native
                defaultValue="empty"
                variant="outlined"
                id="gpa"
                name="gpa"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="2.0" value="2.0">
                  2.0
                </option>
                <option key="2.1" value="2.1">
                  2.1
                </option>
                <option key="2.2" value="2.2">
                  2.2
                </option>
                <option key="2.3" value="2.3">
                  2.3
                </option>
                <option key="2.4" value="2.4">
                  2.4
                </option>
                <option key="2.5" value="2.5">
                  2.5
                </option>
                <option key="2.6" value="2.6">
                  2.6
                </option>
                <option key="2.7" value="2.7">
                  2.7
                </option>
                <option key="2.8" value="2.8">
                  2.8
                </option>
                <option key="2.9" value="2.9">
                  2.9
                </option>
                <option key="3.0" value="3.0">
                  3.0
                </option>
                <option key="3.1" value="3.2">
                  3.1
                </option>
                <option key="3.2" value="3.2">
                  3.2
                </option>
                <option key="3.3" value="3.3">
                  3.3
                </option>
                <option key="3.4" value="3.4">
                  3.4
                </option>
                <option key="3.5" value="3.5">
                  3.5
                </option>
                <option key="3.6" value="3.6">
                  3.6
                </option>
                <option key="3.7" value="3.7">
                  3.7
                </option>
                <option key="3.8" value="3.8">
                  3.8
                </option>
                <option key="3.9" value="3.9">
                  3.9
                </option>
                <option key="4.0" value="4.0">
                  4.0
                </option>
              </Select>
              <FormHelperText>GPA</FormHelperText>
            </FormControl>
            <FormControl required style={{ margin: "5px" }}>
              <Select
                native
                required
                defaultValue="empty"
                variant="outlined"
                id="classYear"
                name="classYear"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="freshman" value="freshman">
                  Freshman
                </option>
                <option key="sophomore" value="sophomore">
                  Sophomore
                </option>
                <option key="junior" value="junior">
                  Junior
                </option>
                <option key="senior" value="senior">
                  Senior+
                </option>
              </Select>
              <FormHelperText>Year in school</FormHelperText>
            </FormControl>
            <FormControl required style={{ margin: "5px" }}>
              <Select
                native
                defaultValue="empty"
                variant="outlined"
                id="experience"
                name="experience"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="noExperience" value="noExperience">
                  No Experience
                </option>
                <option key="nonFortune500" value="nonFortune500">
                  Non Fortune 500
                </option>
                <option key="fortune500" value="fortune500">
                  Fortune 500
                </option>
                <option key="bigN" value="bigN">
                  Big N / FAANG+
                </option>
              </Select>
              <FormHelperText>Most Prestegious Internship Level</FormHelperText>
            </FormControl>
            <FormControl style={{ margin: "5px" }}>
              <Select
                required
                native
                defaultValue="empty"
                variant="outlined"
                id="numExperience"
                name="numExperience"
                inputRef={register}
              >
                <option key="empty" value="empty" hidden disabled></option>
                <option key="0" value="0">
                  0
                </option>
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3+
                </option>
              </Select>
              <FormHelperText>
                Number of Internships / Equivalent
              </FormHelperText>
            </FormControl>
            <Button
              style={{ margin: "10px" }}
              label="Submit"
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
