import React from "react";
import firestore from "./Firestore";
import "firebase/functions";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

class AddAJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      companies: [],
      companyOptions: [],
      jobTitle: "",
      jobLink: "",
    };
  }

  componentDidMount() {
    firestore
      .firestore()
      .collection("companies")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(function (doc) {
          return { key: doc.id, data: doc.data() };
        });
        this.setState({
          companies: data,
          companyOptions: this.createCompanySelections(data),
        });
      });
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createCompanySelections(companies) {
    var company_selections = [];
    if (companies) {
      company_selections = companies.map((Company) => (
        <option key={Company.key} value={Company.key}>
          {Company.data.Name}
        </option>
      ));
    }
    company_selections.unshift(
      <option key="empty" value="" hidden disabled></option>
    );
    company_selections.sort(function(a, b) { 
      return a.key.localeCompare(b.key)
    });
    return company_selections;
  }

  submitJob = (event) => {
    event.preventDefault();
    let comp = this.state.companies.filter((company) => {
      return company.key === this.state.company;
    });
    const addJobFunction = firestore.functions().httpsCallable("addJob");
    addJobFunction({
      companyName: comp[0].data.Name,
      jobTitle: this.state.jobTitle,
      jobLink: this.state.jobLink,
      companyKey: this.state.company,
    });
    this.setState({
        jobTitle: '',
        jobLink: '',
    })
  };

  render() {
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
              Add a job to the database
            </Typography>
          </Grid>
          <Grid item xs={10} margin={3}>
            <form onSubmit={this.submitJob}>
              {this.state.companyOptions && this.state.companyOptions.length && (
                <FormControl variant="outlined" style={{ margin: "5px" }}>
                  <Select
                    native
                    variant="outlined"
                    value={this.state.company}
                    onChange={this.updateInput}
                    inputProps={{
                      name: "company",
                    }}
                  >
                    {this.state.companyOptions}
                  </Select>
                  <FormHelperText>Company</FormHelperText>
                </FormControl>
              )}
              <TextField
                required
                id="jobTitle"
                name="jobTitle"
                value={this.state.jobTitle}
                onChange={this.updateInput}
                helperText="Job Title"
                variant="outlined"
                style={{ margin: "5px" }}
              />
              <TextField
                required
                id="jobLink"
                name="jobLink"
                value={this.state.jobLink}
                onChange={this.updateInput}
                helperText="Link to Application"
                variant="outlined"
                style={{ margin: "5px" }}
              />
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
}

export default AddAJob;
