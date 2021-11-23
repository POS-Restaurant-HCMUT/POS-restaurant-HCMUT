import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import Demo from "./Components/Pages/Authenticate/SignIn";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import ViewMenu from "./Components/Pages/MenuPage/ViewMenu";
import Cart from "./Components/Pages/Cart/Cart";
import AboutUs from "./Components/Pages/AboutUs";
import SuccessPayment from './Components/Pages/SuccessPayment';
import FailPayment from './Components/Pages/FailPayment';
import SignUp from "./Components/Pages/Authenticate/SignUp";
import AccountContextProvider from "./context/accountContext";

function App() {
  return (
    <div className="container1">
      <Router>
        <AccountContextProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/view-menu" exact component={ViewMenu} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/demo" exact component={Demo} />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/success" exact component={SuccessPayment} />
            <Route path="/fail" exact component={FailPayment} />
          </Switch>
          <Footer />
        </AccountContextProvider>
      </Router>
    </div>
  );
}

export default App;
