import React from "react";
import "./App.css";
import Homepage from "./components/pages/homepage";
import ResultPage from "./components/pages/resultPage";
import { useSelector } from "react-redux";
import { loginSelector } from "./store/slices";

function App() {
  const { classes } = useSelector(loginSelector);
  return (
    <div className="App">
      {classes.length ? <ResultPage classes={classes} /> : <Homepage />}
    </div>
  );
}

export default App;
