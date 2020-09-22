import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import {
  Typography,
  Grid,
  NativeSelect,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import firestore from "./Components/Firestore";

//make it so there are default selections for companies and jobs
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      companies: [],
      companyOptions: [],
      jobOptions: [],
      jobs: [],
      company: "Company",
      job: "Job",
    };
  }

  componentDidMount() {
    this.state.db = firestore.firestore();
    this.state.db
      .collection("companies")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({
          companies: data,
          companyOptions: this.createCompanySelections(data),
        });
      });
  }

  updateInput = (e) => {
    if (e.target.name === "company") {
      //prevent leftover values from disabling search button
      this.state.job = "Job";
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createCompanySelections(companies) {
    var company_selections = [];
    if (companies) {
      company_selections = companies.map((Company) => (
        <option key={Company.Name}>{Company.Name}</option>
      ));
    }
    company_selections.unshift(
      <option key="empty" hidden disabled>
        Company
      </option>
    );
    company_selections.sort(function(a, b) { 
      return a.key.localeCompare(b.key)
    });
    return company_selections;
  }

  updateJobs(company) {
    var jobs_selections = [];
    if (company) {
      for (const [key, value] of Object.entries(company)) {
        jobs_selections.push(
          <option key={key} value={value}>
            {key}
          </option>
        );
      }
    }
    jobs_selections.unshift(
      <option key="empty" hidden disabled>
        Job
      </option>
    );
    this.state.jobOptions = jobs_selections;
  }

  render() {
    let jobs = this.state.companies.filter((company) => {
      return company.Name === this.state.company;
    });
    if (jobs.length) {
      this.state.jobs = jobs[0].jobs;
      this.updateJobs(this.state.jobs);
    }
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
              A career site for coders
            </Typography>
            <Typography variant="h6" align="left">
              Bring data to your job search.
            </Typography>
          </Grid>
          <Grid item xs={10}>
            {this.state.companyOptions && this.state.companyOptions.length && (
              <FormControl style={{ margin: "3px" }}>
                <InputLabel htmlFor="companies">Companies</InputLabel>
                <NativeSelect
                  variant="standard"
                  value={this.state.company}
                  onChange={this.updateInput}
                  inputProps={{
                    name: "company",
                  }}
                >
                  {this.state.companyOptions}
                </NativeSelect>
              </FormControl>
            )}
            {this.state.jobOptions && this.state.jobOptions.length > 0 && (
              <FormControl style={{ margin: "3px" }}>
                <InputLabel htmlFor="age-native-helper">Jobs</InputLabel>
                <NativeSelect
                  variant="standard"
                  value={this.state.job}
                  onChange={this.updateInput}
                  inputProps={{
                    name: "job",
                  }}
                >
                  {this.state.jobOptions}
                </NativeSelect>
              </FormControl>
            )}
            {this.state.job !== "Job" && (
              <Button
                component={Link}
                to={{
                  pathname: "/chart",
                  state: { jobKey: this.state.job },
                }}
                style={{ margin: "4px" }}
                variant="contained"
                size="large"
                color="primary"
              >
                Search
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
