import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import Demo from "./Components/Pages/SignIn";
import "./App.css";
import ViewMenu from "./Components/Pages/MenuPage/ViewMenu";
import Cart from "./Components/Pages/Cart/Cart";
import AboutUs from "./Components/Pages/AboutUs";

function App() {
  return (
    <div className="container1">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/view-menu" exact component={ViewMenu} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/demo" exact component={Demo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
