import React from "react";
import { useForm } from "react-hook-form";
import firestore from "./Firestore";
import { Grid, Typography, Button, TextField } from "@material-ui/core";

export default function AddACompany() {
  const { register, handleSubmit, reset } = useForm();

  const onAdd = (data) => {
    addCompanyFunction({companyName: data.companyName});
    reset();
  };

  const addCompanyFunction = firestore.functions().httpsCallable("addCompany");

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
        <Grid item>
          <Typography variant="h3" margin={5} align="left">
            Add a company to the database
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <form onSubmit={handleSubmit(onAdd)}>
            <TextField
              required
              id="companyName"
              name="companyName"
              inputRef={register}
              helperText="Company Name"
              variant="outlined"
            />
            <Button
              style={{ margin: "4px" }}
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
