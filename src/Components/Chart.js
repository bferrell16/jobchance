import React from "react";
import { withRouter } from "react-router-dom";
import firestore from "./Firestore";
import AddJobData from "./AddJobData";
import { Typography } from "@material-ui/core";
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
            company: data.company,
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
      //added these data points late
      item.referral = item.referral == undefined ? "no" : "yes";
      item.underRepresentedGroup = item.underRepresentedGroup == undefined ? "no" : "yes";
      if (item.experience === "bigN") {
        //add in experience
        y = y + 7;
      }
      if (item.experience === "finTech") {
        //add in experience
        y = y + 5;
      }
      if (item.experience === "fortune500") {
        y = y + 4;
      }
      if (item.experience === "nonFortune500") {
        y = y + 2;
      } //no experience doesnt add to y value
      if (item.school === "10") {
        //add in school rank
        y = y + 5;
      }
      if (item.school === "25") {
        y = y + 3;
      }
      if (item.school === "50") {
        y = y + 2;
      }
      if (item.school === "100") { //dont add anything for schools over 100th
        y = y + 1;
      }/*
      if (item.school === "250") {
        y = y + 1;
      }*/ //dont add anything for schools over 250th
      y = y / 12; //y / max y value

      if (item.outcome === "rejected") {
        rejected.push({
          x: x,
          y: y,
          school: item.school,
          experience: item.experience,
          numExperience: item.numExperience,
          classYear: item.classYear,
          underRepresentedGroup: item.underRepresentedGroup,
          referral: item.referral,
        });
      } else if (item.outcome === "offer") {
        offer.push({
          x: x,
          y: y,
          school: item.school,
          experience: item.experience,
          numExperience: item.numExperience,
          classYear: item.classYear,
          underRepresentedGroup: item.underRepresentedGroup,
          referral: item.referral,
        });
      } else if (item.outcome === "hadAnInterview") {
        hadAnInterview.push({
          x: x,
          y: y,
          school: item.school,
          experience: item.experience,
          numExperience: item.numExperience,
          classYear: item.classYear,
          underRepresentedGroup: item.underRepresentedGroup,
          referral: item.referral,
        });
      } else {
        ghosted.push({
          x: x,
          y: y,
          school: item.school,
          experience: item.experience,
          numExperience: item.numExperience,
          classYear: item.classYear,
          underRepresentedGroup: item.underRepresentedGroup,
          referral: item.referral,
        });
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
    var padding = 0;
    if (window.innerWidth > 500) {
      padding = 40;
      yLabel = true;
    } else {
      padding = 0;
      yLabel = false;
    }
    return (
      <div style={{ padding: padding, textAlign: "center" }}>
        <div style={{ marginBottom: 25 }}>
          <Typography variant="h3" margin={5} align="center">
            {this.state.company}
          </Typography>
          <Typography variant="h6" margin={5} align="center">
            {this.state.jobTitle}
          </Typography>
          <a href={this.state.jobLink}>click me to apply </a>
        </div>
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
            tooltips: {
              displayColors: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data["datasets"][tooltipItem.datasetIndex];
                  var multistringText = [
                    "Class Year: " +
                      dataset["data"][tooltipItem["index"]].classYear,
                  ];
                  multistringText.push(
                    "School rank: " +
                      [dataset["data"][tooltipItem["index"]].school]
                  );
                  multistringText.push(
                    "Experience: " +
                      [dataset["data"][tooltipItem["index"]].experience]
                  );
                  multistringText.push(
                    "Number of experiences: " +
                      [dataset["data"][tooltipItem["index"]].numExperience]
                  );
                  multistringText.push(
                    "Underrepresented group: " +
                      [dataset["data"][tooltipItem["index"]].underRepresentedGroup]
                  );
                  multistringText.push(
                    "Had a referral: " +
                      [dataset["data"][tooltipItem["index"]].referral]
                  );
                  return multistringText;
                },
                beforeLabel: (item, data) => "",
              },
            },
          }}
        />
        <AddJobData jobKey={this.state.jobKey} company={this.state.company} jobTitle={this.state.jobTitle} />
      </div>
    );
  }
}

export default withRouter(Chart);
