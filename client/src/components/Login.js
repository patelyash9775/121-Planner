import React, {useContext, useState} from 'react'
import loginpic from "../images/login.jpeg";
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from "../App";

const Login = () =>{

const {state,dispatch} = useContext(UserContext);

  const history = useHistory();
  const [email,setEmail]=useState('');

  const [password,setPassword]=useState('');

  const loginUser = async (e)=>{
          e.preventDefault();
          const res = await fetch('/signin',{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },body:JSON.stringify({
              email,
              password
            })
          });
          const data = res.json();
          if(res.status=== 400 || !data){
            window.alert("Invalid Credential");
          }else{
            dispatch({type:'USER',payload:true})
            window.alert("Login Successfull");
            history.push("/"); 
          }
  }
    return (
    <>
       <section className='sign-in'>
            <div className='container text-center'>
            <div className='signin-content'>
                        <div className='signin-register'>
                            <figure>
                                <img src='http://virtual.barodaweb.org.in/assets/img/aggregator.svg' alt="registration pic"></img>
                            </figure>
                            <NavLink to="/signup" className='btn btn-warning'>
                                Create an account
                            </NavLink>
                        </div>
                <div className='signin-form'>
                    <h2 className='form-title'>Sign in</h2>
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

                        

                        <div className='form-group'>
                            <label htmlFor='password'>
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            <input type="password" name='password' id='password' autoComplete="off" 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder='Your Password'/>
                            </label>
                        </div>
                        <NavLink to="/Reset1" className='forgot'>
                          Forgot Password?
                        </NavLink>


                        <div className='form-group form-button login'>
                            <input type='submit' name='signin' id='signin' className='btn btn-primary' 
                            value='Log in' onClick={loginUser} />
                        </div>
                        
                    </form>
                    </div>
                       
            </div>
            </div>
        </section>
    </>
    )
}

export default Login