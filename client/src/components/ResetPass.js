import React, {useContext, useState} from 'react'
import loginpic from "../images/login.jpeg";
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from "../App";

const ResetPass = () =>{

    const history = useHistory();
    const [password,setPassword]=useState('');

    const reset = async (e)=>{
        e.preventDefault();
          const res = await fetch('/ResetPass',{
             method:"POST",
             headers: {
                "Content-Type": "application/json"
              },body:JSON.stringify({
                password
              })
          });
        //   console.log(password);
          const data = res.json();
        //   console.log(data)
          if(res.status=== 201){
            window.alert("Password updated");
            history.push("/Login");
          }else{
           
            window.alert("Password has not been changed");
           
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
                        <h2 className=''>Reset Password</h2>
                        <form  method="POST" className='register-form' id='register-form'>
                           
    
                        <div className='form-group'>
                            <label htmlFor='password'>
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            <input type="password" name='password' id='password' autoComplete="off" 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder='Your New Password'/>
                            </label>
                        </div>

                       
                            
    
    
                            <div className='form-group form-button register'>
                                <input type='submit' name='signin' id='signin' className='btn btn-primary' 
                                value='Reset' onClick={reset} />
                            </div>
                            
                        </form>
                        </div>
                           
                </div>
                </div>
            </section>
        </>
        )


    }

export default ResetPass;
