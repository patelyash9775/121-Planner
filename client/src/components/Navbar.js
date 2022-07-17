import React,{useEffect,useState,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.png";
import {UserContext} from "../App";


const Navbar = () => {

    
    const {state,dispatch} = useContext(UserContext);

    const [userData,setUserData] = useState('');

    const userContact = async () => {
        try{
            const res = await fetch('/getdata',{

                method: "GET",
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                }
              
             } )
             const data = await res.json();
             setUserData(data.username)
            console.log(userData,"usename navbar");

            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        userContact();
    },[state]);

    const RenderMenu = () => {
        if(state){
            return(
                <>
           
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/About">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/SendRequest">Schedule Meeting</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/ReceiveRequest">Receive Req</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/MeetingStatus">Meeting Status</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link btn btn-outline-success my-2 my-sm-0" to="/Logout">Log out</NavLink>
                    </li>
                    <div className='user_name'>
                    <li className="nav-item username">
                        <NavLink className="nav-link btn btn-warning my-2 my-sm-0" to="/About"><i class="zmdi zmdi-account material-icons-name"></i>{userData}</NavLink>
                    </li>
                    </div>
                
                </>
            )
        }
        else{
            return(
                <>
                
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/About">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Signup">Registration</NavLink>
                    </li>
                
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

           
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt='logo'></img>
                </NavLink>
                <div className='navC'>
                <ul className="navbar-nav ml-auto">
                    <RenderMenu/>
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Navbar