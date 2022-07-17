import React, {useEffect,useState} from 'react'

const Contact = () =>{

 
    const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});

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
             setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

             if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
             }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        userContact();
    },[]);

    const handleInputs =(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUserData({...userData,[name]:value});
  }

  const contactform=async (e)=>{
    e.preventDefault();
    const {name,email,phone,message}=userData;
    const res= await fetch('/contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });

    const data = await res.json();
    if(!data){
    //   console.log("message not send");
    alert("message not send");
    }else{
      alert("message send");
      setUserData({...userData,message:""});
    }
  }

    return (
        <>
            <div className='contact_info'>
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
                           
                            <div className='contact_info_item'>
                                <i className="zmdi zmdi-account material-icons-name mt-1"></i>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Name
                                    </div>
                                    <div className='contact_info_text'>
                                    {userData.name}
                                    </div>
                                </div>
                            </div>

                             {/* Phone Number */}
                            <div className='contact_info_item'>
                                <i className="zmdi zmdi-email material-icons-name mt-1"></i>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Email
                                    </div>
                                    <div className='contact_info_text'>
                                    {userData.email}
                                    </div>
                                </div>
                            </div>

                             {/* Phone Number */}
                            <div className='contact_info_item '>
                                <i className="zmdi zmdi-phone-in-talk material-icons-name mt-1"></i>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Phone
                                    </div>
                                    <div className='contact_info_text'>
                                    {userData.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact us form */}
            <div className='contact_form mt-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                                <div className='contact_form_title text-center mb-4'>
                                    Get in Touch
                                </div>
                                <form method='POST' id='contact_form'>
                                    <div className='contact_form_name d-flex justify-content-between align-items-between'>
                                        <input type='text' id='contact_form_name'
                                        className='contact_form_name input_field'
                                        name='name'
                                        value={userData.name} placeholder='Your name' onChange={handleInputs} required='true'/>

                                    <input type='email' id='contact_form_email'
                                        className='contact_form_email input_field'
                                        name='email'
                                       value={userData.email}  placeholder='Your Email' onChange={handleInputs} required='true'/>

                                    <input type='number' id='contact_form_phone'
                                        className='contact_form_phone input_field'
                                        name='phone'
                                       value={userData.phone}  placeholder='Your Phone Number' onChange={handleInputs} required='true'/>
                                    </div>

                                    <div className='contact_form_text mt-5'>
                                        <textarea className='text_field contact_form_message'
                                        name='message' onChange={handleInputs} placeholder='Message' cols='100' rows='10'></textarea>
                                    </div>

                                    <div className='contact_form_button text-center mt-3'>
                                        <button type='submit' className='button btn btn-primary' onChange={handleInputs} 
                                        value={userData.phone} onClick={contactform}>Send Message</button>
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            
        </>
    )
}

export default Contact