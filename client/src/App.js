import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from './components/Errorpage';
import Logout from "./components/Logout";
import SendRequest from "./components/SendRequest";
import ReceiveRequest from "./components/ReceiveRequest";
import MeetingStatus from "./components/MeetingStatus"
import Reset1 from "./components/Reset1"
import OtpVerify from "./components/OtpVerify"
import ResetPass from './components/ResetPass';
import { initialState,reducer } from './reducer/useReducer';


export const UserContext=createContext();

const Routing=()=>{
     return(
      <div className='conn'>
     <Switch>
<Route exact path="/">
   <Home/>
</Route>
<Route path="/about">
   <About/>
</Route>
<Route path="/contact">
   <Contact/>
</Route>
<Route path="/login">
   <Login/>
</Route>
<Route path="/signup">
   <Signup/>
</Route>
<Route path="/SendRequest">
   <SendRequest/>
</Route>
<Route path="/ReceiveRequest">
   <ReceiveRequest/>
</Route>
<Route path="/MeetingStatus">
   <MeetingStatus/>
</Route>
<Route path="/Reset1">
   <Reset1/>
</Route>
<Route path="/OtpVerify">
   <OtpVerify/>
</Route>
<Route path="/ResetPass">
   <ResetPass/>
</Route>

<Route path="/logout">
   <Logout/>
</Route>

</Switch>
</div>
     )
} 
function App() {
     const[state,dispatch]=useReducer(reducer,initialState)


  return (
   <>
   <UserContext.Provider value={{state,dispatch}}>
   <Navbar/>
   <Routing/>
   </UserContext.Provider>
   
   </>
  );
}

export default App;