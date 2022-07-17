import React, {useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom';



const ReceiveRequest = () => {

    const history = useHistory();
    

    const [user,SetUser] = useState({
        username:""
    });

    let name,value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        SetUser({[name]:value});
        console.log(user)
    }

    const [userData,setUserData] = useState({username:""});

    const [personInfo,setpersonInfo] = useState({name:"",email:"",phone:""});

    let id;

    

    const AcceptData = async (e) => {
        e.preventDefault();
        if(user){
            console.log(userData.username)
            const infoFilter = info.filter(item => item.sender === user.username && item.username === userData.username && item.status === "pending")
            console.log("Response :- ",infoFilter);
            console.log(infoFilter[0]._id)
            id = infoFilter[0]._id;
            console.log("idddd:- ",id)
            const status = "Accepted"
            const condition = "true"
      
            const res = await fetch('/ReceiveRequest',{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    {id, status,condition}
                )
                
            });
            const data = await res.json();
            // console.log(data)
    
            if(res.status === 422 || !data){
            window.alert("Plzz select the user");
          
            }
            else{
                window.alert("Your response has been sent")
                history.push("/MeetingStatus")
            }
        
        }

    }

    const RejectData = async (e) => {
        e.preventDefault();
        if(user){
            // console.log(userData.username)
            const infoFilter = info.filter(item => item.sender === user.username && item.username === userData.username && item.status === "pending")
           
            id = infoFilter[0]._id;
            // console.log(id);
            const condition = "false"
            const status = "Rejected"
            const res = await fetch('/ReceiveRequest',{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ 
        id,status,condition
                })
                
            });
            const data = await res.json();
            // console.log(data)
    
            if(res.status === 422 || !data){
            window.alert("Plzz select the user");
          
            }
            else{
                window.alert("Your response has been sent")
                history.push("/MeetingStatus")
            }
        }
    
    }


    const userContact=async()=>{

            try{
                const res =await fetch('/getdata',{
                  method:"GET"
                });
                const data = await res.json();
              
                setUserData({ ...userData, username: data.username});
               
                //console.log(userData);
                if(!res.status===200){
                  const error = new Error(res.error);
                  throw error;
                }
    
            }
            catch(err){
              console.log(err);
            }      
      }


    const [info,setInfo] = useState([]);
    const [userinfo,setUserInfo] = useState([]);
    const [names, setNames] = useState([]);
    const [meetinginfo,setMeetingInfo] = useState({date:"",location:"",restaurant:""})

    

    const infoPerson=async()=>{

        try{
            const res = await fetch("/ReceiveRequest",{headers: {method: "GET"}})
            const data = await res.json()
            // console.log(data)
            await setInfo(data.meeting);
            await setUserInfo(data.user);
            
        }
        catch(err){
          console.log(err);

        }

        


   

        const condition = "true";

        const filtered = info.filter(item => item.username === userData.username && item.condition === condition)
        // console.log("filtered data :- ",filtered);
            
       if(filtered){
                let namme = []
                filtered.map(item => {
                    namme.push(item.sender)
                })
                if(namme){
                    setNames(namme)
                }
                // console.log(names)
            
            }
            if(user){
                // console.log("user:- ",user.username)
                const infoFilter = info.filter(item => item.sender === user.username)
                
                // console.log(infoFilter);
                infoFilter.map(item => {
                    setMeetingInfo({...meetinginfo, date: item.date, location: item.location, restaurant: item.restaurant})
                })
            }
        

        
         if(userinfo && user){
                    const info = userinfo.filter(item => item.username === user.username)
                    // console.log(info);
                    if(info){
                    info.map(item => {
                        setpersonInfo({...personInfo, name: item.name, email: item.email, phone: item.phone})
                    })
                }
                }
    }

    

  useEffect(()=>{

    infoPerson();
    userContact();
},[userData,user]);


    return (
        <>
        <section className='signup'>
            <div className='container text-center'>
            <div className='signup-content mt-5'>
                <div className='signup-form'>
                    <h2 className=''><u>Requests</u></h2>
                    <form  method="POST" className='register-form' id='register-form'>
                        <div className='form-group'>
                        <div className='Form-element'>
                            <label htmlFor='name'>
                            <i class="zmdi zmdi-account material-icons-name"></i>
                            <select type="text" name="username" id='username' value={user.username}
                            onChange={handleInputs}>
                               {console.log("Names :- ",names)}
                                <option>Choose Person</option>

                                {names.length>0 ? names.map(name => <option>{name}</option>) : <option disabled="disabled" selected="selected">NO Person</option>}
                            </select>
                    
                            </label>
                        </div>

                        <div className='Form-element info'>
                            <p>Name:- {personInfo.name}</p>
                            <p>Email:-{personInfo.email}</p>
                            <p>phone:-{personInfo.phone}</p>
                            <br/>
                            <h4 className='info-title'><u>Meeting Info</u></h4>
                            <p>Date:-{meetinginfo.date}</p>
                            <p>Location:-{meetinginfo.location}</p>
                            <p>Hotel:-{meetinginfo.restaurant}</p>
                        </div>

                        

                        <div className='form-button Form-element form-group'>
                            <input type='submit' name='signup' id='signup' className='btn btn-success req' 
                            value='Accept' onClick={AcceptData}/>
                            <input type='submit' name='signup' id='signup' className='btn btn-danger req' 
                            value='Reject' onClick={RejectData}/>
                        </div>
                        </div>
                    </form>
                    </div>
                        
            </div>
            </div>
        </section>
        </>
    )

}


export default ReceiveRequest;