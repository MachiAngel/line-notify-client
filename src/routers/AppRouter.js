
import React from "react";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";

// import App from '../container/App';
import LoginPage from '../container/login/LoginPage'
import AuthPage from '../container/AuthPage/AuthPage'
import DashBoard from '../container/DashBoard/DashBoard'
import AuthComponent from '../component/AuthComponent/AuthComponent'
import PttForm from '../component/PttForm/PttForm'


const AppRouter = () => (
  
    <div>
      <AuthComponent></AuthComponent>
      <Switch>
        
        <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/callback" component={AuthPage} exact={true} />
        <Route path="/subscription/ptt/:id" component={PttForm} exact={true} />
        <Route component={DashBoard} />

      </Switch>
    </div>
  
);

export default AppRouter;