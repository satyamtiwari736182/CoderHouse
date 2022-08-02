import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loading/Loader";

// const isAuth = false
// const user = {
//   activated: false,
// }

function App() {



  // call refresh endpoint via some custom hooks
  const { loading } = useLoadingWithRefresh()

  return (loading ? <Loader message="Loading, please wait..." /> :
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute exact path='/'>
          <Home />
        </GuestRoute>

        <GuestRoute path='/authenticate'>
          <Authenticate />
        </GuestRoute>

        <SemiProtectededRoute path='/activate'>
          <Activate />
        </SemiProtectededRoute>

        <ProtectededRoute path='/rooms'>
          <Rooms />
        </ProtectededRoute>

      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (
          isAuth ?
            <Redirect to={{ pathname: '/rooms', state: { from: location }, }} />
            : children
        )
      }}>

    </Route>
  )
}

const SemiProtectededRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth)
  return <Route
    {...rest}
    render={({ location }) => {
      return (
        !isAuth ?
          <Redirect to={{ pathname: '/', state: { from: location } }} />
          : isAuth && !user.activated ?
            children
            : <Redirect to={{ pathname: '/rooms', state: { from: location } }} />
      )
    }}>
  </Route>
}


const ProtectededRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth)
  return <Route
    {...rest}
    render={({ location }) => {
      return (
        !isAuth ?
          <Redirect to={{ pathname: '/', state: { from: location } }} />
          : isAuth && !user.activated ?
            <Redirect to={{ pathname: '/activate', state: { from: location } }} />
            : children
      )
    }}>
  </Route>
}

export default App;
