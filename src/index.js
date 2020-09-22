import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Chart from "./Components/Chart";
import About from "./Components/About";
import AddACompany from './Components/AddACompany';
import AddAJob from './Components/AddAJob';
import * as serviceWorker from "./serviceWorker";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#f06292",
    },
    type: "light",
  },
  typography: {
    fontFamily: "Source Code Pro",
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/chart">
          <Chart />
        </Route>
        <Route exact path="/addcompany">
          <AddACompany />
        </Route>
        <Route exact path="/addjob">
          <AddAJob />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
