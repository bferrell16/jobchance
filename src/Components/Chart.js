import React from "react";
import { withRouter } from "react-router-dom";
import firestore from "./Firestore";
import AddJobData from "./AddJobData";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import { Scatter } from "react-chartjs-2";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobKey: "",
      jobData: "",
      company: "",
      jobTitle: "",
      jobLink: "",
      chartData: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: [],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const { jobKey } = this.props.location.state;
    firestore
      .firestore()
      .collection("jobs")
      .doc(jobKey)
      .get()
      .then((DocumentSnapshot) => {
        if (DocumentSnapshot.exists) {
          const data = DocumentSnapshot.data();
          this.fixData(data.data);
          this.setState({
            jobKey: jobKey,
            jobData: data.data,
            company: data.Company,
            jobTitle: data.title,
            jobLink: data.link,
          });
        } else {
          console.log("nope");
        }
      });
  }

  fixData(jobDataIn) {
    var offer = [];
    var ghosted = [];
    var hadAnInterview = [];
    var rejected = [];
    jobDataIn.forEach((item) => {
      var y = 0; //number of experiences not that valued, so took out parseInt(item.numExperience)
      const x = parseFloat(item.gpa);
      if (item.experience === "bigN") {
        //add in experience
        y = y + 7;
      }
      if (item.experience === "fortune500") {
        y = y + 4;
      }
      if (item.experience === "nonFortune500") {
        y = y + 2;
      } //no experience doesnt add to y value
      if (item.school === "10") {
        //add in school rank
        y = y + 7;
      }
      if (item.school === "25") {
        y = y + 5;
      }
      if (item.school === "50") {
        y = y + 3;
      }
      if (item.school === "100") {
        y = y + 2;
      }
      if (item.school === "250") {
        y = y + 1;
      } //dont add anything for schools over 250th
      y = y / 14; //y / max y value

      if (item.outcome === "rejected") {
        rejected.push({ x: x, y: y });
      } else if (item.outcome === "offer") {
        offer.push({ x: x, y: y });
      } else if (item.outcome === "hadAnInterview") {
        hadAnInterview.push({ x: x, y: y });
      } else {
        ghosted.push({ x: x, y: y });
      }
    });
    this.setState({
      chartData: {
        datasets: [
          {
            label: "Recieved Offer",
            data: offer,
            backgroundColor: "green",
            pointRadius: 5,
          },
          {
            label: "Ghosted",
            data: ghosted,
            backgroundColor: "gray",
            pointRadius: 5,
          },
          {
            label: "Rejected",
            data: rejected,
            backgroundColor: "red",
            pointRadius: 5,
          },
          {
            label: "Had an Interview",
            data: hadAnInterview,
            backgroundColor: "blue",
            pointRadius: 5,
          },
        ],
      },
    });
  }

  render() {
    var yLabel = false;
    if (window.innerWidth > 500) {
      yLabel = true;
    } else {
      yLabel = false;
    }
    return (
      <div style={{ padding: 0, textAlign: 'center' }}>
        <Typography variant="h3" margin={5} align="center">
          {this.state.company}
        </Typography>
        <Typography variant="h6" margin={5} align="center">
          {this.state.jobTitle}
        </Typography>
        <a href={this.state.jobLink}>click me to apply </a>
        <Scatter
          data={this.state.chartData}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: yLabel,
                    labelString: "Experience Score",
                  },
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 1,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "GPA",
                  },
                  ticks: {
                    beginAtZero: true,
                    min: 2,
                    max: 4,
                  },
                },
              ],
            },
          }}
        />
        <AddJobData jobKey={this.state.jobKey} />
      </div>
    );
  }
}

export default withRouter(Chart);
