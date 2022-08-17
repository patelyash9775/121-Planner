import React,{useEffect,useState,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.png";
import '../components/style.css'
import '../components/script.js'
import {UserContext} from "../App";



    // SIDEBAR DROPDOWN




const Navbar = () => {

    // SIDEBAR DROPDOWN
    


    
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

    useEffect(() => {
        // SIDEBAR DROPDOWN
        const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
        const sidebar = document.getElementById('sidebar');

        allDropdown.forEach(item=> {
            const a = item.parentElement.querySelector('a:first-child');
            a.addEventListener('click', function (e) {
                e.preventDefault();

                if(!this.classList.contains('active')) {
                    allDropdown.forEach(i=> {
                        const aLink = i.parentElement.querySelector('a:first-child');

                        aLink.classList.remove('active');
                        i.classList.remove('show');
                    })
                }

                this.classList.toggle('active');
                item.classList.toggle('show');
            })
        })





        // SIDEBAR COLLAPSE
        const toggleSidebar = document.querySelector('nav .toggle-sidebar');
        const allSideDivider = document.querySelectorAll('#sidebar .divider');

        if(sidebar.classList.contains('hide')) {
            allSideDivider.forEach(item=> {
                item.textContent = '-'
            })
            allDropdown.forEach(item=> {
                const a = item.parentElement.querySelector('a:first-child');
                a.classList.remove('active');
                item.classList.remove('show');
            })
        } else {
            allSideDivider.forEach(item=> {
                item.textContent = item.dataset.text;
            })
        }

        toggleSidebar.addEventListener('click', function () {
            sidebar.classList.toggle('hide');

            const conn = document.getElementById("conn");
            console.log(conn.classList);
            
            if(conn){
            conn.classList.toggle("conn-right")
            }

            if(sidebar.classList.contains('hide')) {
                allSideDivider.forEach(item=> {
                    item.textContent = '-'
                })

                allDropdown.forEach(item=> {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
            } else {
                allSideDivider.forEach(item=> {
                    item.textContent = item.dataset.text;
                })
            }
        })




        sidebar.addEventListener('mouseleave', function () {
            if(this.classList.contains('hide')) {
                allDropdown.forEach(item=> {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
                allSideDivider.forEach(item=> {
                    item.textContent = '-'
                })
            }
        })



        sidebar.addEventListener('mouseenter', function () {
            if(this.classList.contains('hide')) {
                allDropdown.forEach(item=> {
                    const a = item.parentElement.querySelector('a:first-child');
                    a.classList.remove('active');
                    item.classList.remove('show');
                })
                allSideDivider.forEach(item=> {
                    item.textContent = item.dataset.text;
                })
            }
        })




        // PROFILE DROPDOWN
        const profile = document.querySelector('nav .profile');
        const imgProfile = profile.querySelector('img');
        const dropdownProfile = profile.querySelector('.profile-link');

        imgProfile.addEventListener('click', function () {
            dropdownProfile.classList.toggle('show');
        })




        // MENU
        const allMenu = document.querySelectorAll('main .content-data .head .menu');

        allMenu.forEach(item=> {
            const icon = item.querySelector('.icon');
            const menuLink = item.querySelector('.menu-link');

            icon.addEventListener('click', function () {
                menuLink.classList.toggle('show');
            })
        })



        window.addEventListener('click', function (e) {
            if(e.target !== imgProfile) {
                if(e.target !== dropdownProfile) {
                    if(dropdownProfile.classList.contains('show')) {
                        dropdownProfile.classList.remove('show');
                    }
                }
            }

            allMenu.forEach(item=> {
                const icon = item.querySelector('.icon');
                const menuLink = item.querySelector('.menu-link');

                if(e.target !== icon) {
                    if(e.target !== menuLink) {
                        if (menuLink.classList.contains('show')) {
                            menuLink.classList.remove('show')
                        }
                    }
                }
            })
        })


    },[]);

    const RenderMenu = () => {
        if(state){
            return(
                <>
            
                   
                    <li><NavLink to="/" className="active"><i className='bi bi-house icon'></i>Home</NavLink></li>
                    <li><NavLink to="/SendRequest"><i className="bi bi-send-plus icon"></i>Schedule Meeting</NavLink></li>
                    <li><NavLink to="/ReceiveRequest"><i className="bi bi-files icon"></i>Receive Request</NavLink></li>
                    <li><NavLink to="/MeetingStatus"><i className="bi bi-ticket-detailed-fill icon"></i>Meeting Status</NavLink></li>
                    <li><NavLink to="/Contact"><i className="bi bi-messenger icon"></i>Contact</NavLink></li>
                    <li><NavLink to="/Logout"><i className="bi bi-box-arrow-right icon"></i>Log Out</NavLink></li>
                
                </>
            )
        }
        else{
            return(
                <>
                
                  

                    <li><NavLink to="/" className="active"><i className='bi bi-house icon'></i>Home</NavLink></li>
                    <li><NavLink to="/Signup"><i className="bi bi-person-plus-fill icon"></i>Signup</NavLink></li>
                    <li><NavLink to="/Login"><i className="bi bi-door-closed icon"></i>Log in</NavLink></li>
                    <li><NavLink to="/Contact"><i className="bi bi-messenger icon"></i>Contact</NavLink></li>
                
                </>
            )
        }
    }

    return (
        <>
        <div id="sidebar">
        <div>
        <NavLink to="#" className="brand"><img className="icon" src="http://virtual.barodaweb.org.in/assets/img/aggregator-logo.png" alt=""/>VAMS</NavLink>
        <ul className="side-menu">
            

            <RenderMenu/>
        </ul>
        </div>
    </div>

    <div id="content">
    
        <nav>
            <i className='bi bi-list toggle-sidebar'></i>
            <form action="#">
                <div className="form-group">
                    <input type="text" placeholder="Search..."/>
                    <i className="bi bi-search icon"></i>
                </div>
            </form>
            <NavLink to="#" className="nav-link">
                <i className="bi bi-bell icon"></i>
                <span className="badge">5</span>
            </NavLink>
            <NavLink to="#" className="nav-link">
                <i className="bi bi-chat-left-dots icon"></i>
                <span className="badge">8</span>
            </NavLink>
            <span className="divider"></span>
            <div className="profile">
                <img src="http://virtual.barodaweb.org.in/dashboard/img/profile-logo.webp" alt=""/>
                <ul className="profile-link">
                    <li><NavLink to="/About"><i className="bi bi-person-circle icon"></i> Profile</NavLink></li>
                    <li><NavLink to="/Logout"><i className="bi bi-box-arrow-right icon"></i> Logout</NavLink></li>
                </ul>
            </div>
        </nav>
       
        <main>
            <h1 className="title">121 Planner</h1>
            <ul className="breadcrumbs">
                <li><NavLink to="/">Home</NavLink></li>
                <li className="divider">/</li>
                <li><NavLink to="/" className="active1">Dashboard</NavLink></li>
            
            </ul>


        </main>
       
    </div>
        </>
        )
}

export default Navbar;