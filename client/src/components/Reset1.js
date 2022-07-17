import React, {useContext, useState} from 'react';
import loginpic from "../images/login.jpeg";
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from "../App";

const Reset1 = () =>{

    const history = useHistory();
    const [email,setEmail]=useState('');

    const verify = async (e)=>{
        e.preventDefault();
          const res = await fetch('/reset1',{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },body:JSON.stringify({
              email
            })
          });
          const data = res.json();
          if(res.status=== 400 || !data){
            window.alert("Invalid Email");
          }else{
           
            window.alert("Plss check email..Otp has been sent");
            history.push("/OtpVerify"); 
          }
    }

    return (
        <>
           <section className='sign-in'>
                <div className='container text-center'>
                <div className='signin-content mt-5'>
                            <div className='signin-register'>
                                <figure>
                                    <img src='http://virtual.barodaweb.org.in/assets/img/aggregator.svg' alt="registration pic"></img>
                                </figure>
                                
                            </div>
                    <div className='signin-form text-center'>
                        <h2 className=''>Email Verify</h2>
                        <form  method="POST" className='register-form' id='register-form'>
                           
    
                        <div className='form-group'>
                            <label htmlFor='email'>
                            <i class="zmdi zmdi-email material-icons-name"></i>
                            <input type="email" name='email' id='email' autoComplete="off" 
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder='Your Email'/>
                            </label>
                        </div>

                       
                            
    
    
                            <div className='form-group form-button register'>
                                <input type='submit' name='signin' id='signin' className='btn btn-primary' 
                                value='Sent OTP' onClick={verify} />
                            </div>
                            
                        </form>
                        </div>
                           
                </div>
                </div>
            </section>
        </>
        )


    }

export default Reset1
