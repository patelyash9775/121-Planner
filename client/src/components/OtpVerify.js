import React, {useContext, useState} from 'react'
import loginpic from "../images/login.jpeg";
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from "../App";

const OtpVerify = () =>{

    const history = useHistory();
    const [code,setCode]=useState('');

    const verify = async (e)=>{
        e.preventDefault();
        console.log(code);
          const res = await fetch('/OtpVerify',{
             method:"POST",
             headers: {
                "Content-Type": "application/json"
              },body:JSON.stringify({
                code
              })
          });
          const data = res.json();
          if(res.status=== 400 || !data){
            window.alert("Invalid OTP");
          }else{
           
            window.alert("Otp Verified");
            history.push("/ResetPass"); 
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
                        <h2 className=''>Verify OTP</h2>
                        <form  method="POST" className='register-form' id='register-form'>
                           
    
                        <div className='form-group'>
                            <label htmlFor='code'>
                            <i class="zmdi zmdi-confirmation-number material-icons-name"></i>
                            <input type="text" name='code' id='code' autoComplete="off" 
                            value={code}
                            onChange = {(e) => setCode(e.target.value)}
                            placeholder='Your OTP'/>
                            </label>
                        </div>

                       
                            
    
    
                            <div className='form-group form-button register'>
                                <input type='submit' name='signin' id='signin' className='btn btn-primary' 
                                value='Verify OTP' onClick={verify} />
                            </div>
                            
                        </form>
                        </div>
                           
                </div>
                </div>
            </section>
        </>
        )


    }

export default OtpVerify;
