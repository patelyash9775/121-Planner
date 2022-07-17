import React, {useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.svg"


const Signup = () =>{

    const history = useHistory();

    const [user,SetUser] = useState({
        name:"",username:"",email:"",phone:"",work:"",password:"",cpassword:""
    });

    let name,value;

    const handleInputs = (e) => {
        // console.log(e.target.name, e.target.value);
        name = e.target.name;
        value = e.target.value;
        SetUser({...user,[name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        
        const {name,username,email,phone,work,password,cpassword} = user;

        const res = await fetch('/register',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name,username,email,phone,work,password,cpassword
            })
            
        });
        const data = await res.json();
        
        if(res.status === 422 || !data){
            window.alert("INVALID registration");
            // console.log("INVALID registration");
        }
        else{
            window.alert("Registration Successfull");
            // console.log("Successfull Registration");

            history.push("/login");
        }
    }

    return (
        <>
        <section className='signup'>
            <div className='container text-center'>
            <div className='signup-content'>
                <div className='signup-form'>
                    <h2 className='form-title'>Sign up</h2>
                    <form  method="POST" className='register-form' id='register-form'>
                        <div className='form-group'>
                        <div className='Form-element'>
                            <label htmlFor='name'>
                            <i class="zmdi zmdi-account material-icons-name"></i>
                            <input type="text" name='name' id='name' autoComplete="off" 
                            value={user.name}
                            onChange={handleInputs}
                            placeholder='Your Name'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='name'>
                            <i class="zmdi zmdi-account material-icons-name"></i>
                            <input type="text" name='username' id='username' autoComplete="off" 
                            value={user.username}
                            onChange={handleInputs}
                            placeholder='User Name'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='email'>
                            <i class="zmdi zmdi-email material-icons-name"></i>
                            <input type="email" name='email' id='email' autoComplete="off" 
                            value={user.email}
                            onChange={handleInputs}
                            placeholder='Your Email'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='phone'>
                            <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                            <input type="number" name='phone' id='phone' autoComplete="off" 
                            value={user.phone}
                            onChange={handleInputs}
                            placeholder='Your Phone'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='work'>
                            <i class="zmdi zmdi-slideshow material-icons-name"></i>
                            <select type="text" name="work" id='work' value={user.work}
                            onChange={handleInputs}>
                                <option>Choose Profession</option>
                                <option>Student</option>
                                <option>Teacher</option>
                                <option>Web Developer</option>
                                <option>App Developer</option>
                                <option>Doctor</option>
                                <option>Data Scientist</option>
                            </select>
                            </label>
                        </div>

                        <div className='form-group Form-element'>
                            <label htmlFor='password'>
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            <input type="password" name='password' id='password' autoComplete="off" 
                            value={user.password}
                            onChange={handleInputs}
                            placeholder='Your Password'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='cpassword'>
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            <input type="cpassword" name='cpassword' id='cpassword' autoComplete="off" 
                            value={user.cpassword}
                            onChange={handleInputs}
                            placeholder='Confirm Your Password'/>
                            </label>
                        </div>

                        <div className='form-button Form-element form-group register'>
                            <input type='submit' name='signup' id='signup' className='btn btn-primary' 
                            value='register' onClick={PostData}/>
                        </div>
                        </div>
                    </form>
                    </div>
                        <div className='signup-register'>
                            <figure>
                                <img src={signpic} className='signpic' alt="registration pic"></img> 
                            </figure>
                            <NavLink to="/login" className='btn btn-success mb-3'>
                                I am already Registered
                            </NavLink>
                        </div>
            </div>
            </div>
        </section>
        </>
    )
}

export default Signup;