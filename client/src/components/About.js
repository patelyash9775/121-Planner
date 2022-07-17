import React, { useEffect, useState} from 'react'
// import thapapic from "../images/thapa1.png";
import aboutpic from "../images/aboutpic.png";
import {useHistory} from "react-router-dom";

const About = () =>{

    const history = useHistory();
    const [userData,setUserData] = useState({});

    const callAboutPage = async () => {
        try{
            const res = await fetch('/about',{

                method: "GET",
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
             } )
             const data = await res.json();
             setUserData(data);

             if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
             }
        } catch(err){
            // console.log(err);
            history.push("/login");
        }
    }

    useEffect(()=> {
        callAboutPage();
    },[]);

    return (
        <>
        <div className='conn'>
            <div className='container ml-3 text-center about'>
                <div className='emp-profile'>
                <form method='GET'>
                    <div className='row mt-5'>
                        <div className='col-md-5'>
                            <div className='profile-img'>
                                <img src={aboutpic}  alt='thapa' width="150" height="150"/> 
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head mt-5'>
                                <h3>{userData.name}</h3>
                                <h3 className='mt-3'>{userData.work}</h3>
                            </div>
                        </div>

                       

                    </div>

                    <div className='row mt-3'>
                        
                        <div className='col-md-9 pl-5 about-info'>
                            <div className='tab-content profile-tab' id='myTabContent'>
                                <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab' >
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Username</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.username}</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>

                                    
                                </div>
                            
                        </div>
                    </div>
                
                    </div>
                </form>
                </div>
            </div>
            </div>
           
        </>
    )
}



export default About