import React, {useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom';



const ReceiveRequest = () => {

    const history = useHistory();
    

    const [user,SetUser] = useState([]);

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

    

    const AcceptData = async (e,key) => {
        e.preventDefault();
        if(user){
            console.log(userData.username)
            const infoFilter = info.filter(item => item.sender === finaldata[key].sender && item.username === userData.username && item.status === "pending")
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

    const RejectData = async (e,key) => {
        e.preventDefault();
        if(user){
            // console.log(userData.username)
            const infoFilter = info.filter(item => item.sender === finaldata[key].sender && item.username === userData.username && (item.status === "pending" || item.status === "Accepted"))
           console.log(infoFilter);
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
    let arr = [];
    const [finaldata,setFinaldata]= useState([]);

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
        console.log("filtered data :- ",filtered);
        // console.log("Userinfo :- ",userinfo);
        

        if(filtered){
        
        filtered.map(filter => {
            let tmp = userinfo.filter(val => filter.sender===val.username);
            if(tmp){
                console.log("tmp:- ",tmp);
                arr.push({sender: filter.sender, date:filter.date, location: filter.location, restaurant: filter.restaurant, email: tmp[0].email, phone: tmp[0].phone, name: tmp[0].name })
                // setFinaldata({...finaldata, sender: filter.sender, date:filter.date, location: filter.location, restaurant: filter.restaurant, email: tmp[0].email, phone: tmp[0].phone, name: tmp[0].name })
            }

            // console.log("tmp :- ",tmp);
        })
        console.log("arr",arr);
        setFinaldata(arr);
        console.log("Final Data:- ",finaldata);


    }
            
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
        
        <div className="row receive">
        {(() => {
        if (finaldata.length==0) {
          return (
            <div className="card col-3">
            <div className="card-body">
                <h3 className="rec-title">No Request Available</h3>
            </div>
            </div>
          )
        } 
        }
      )()}

        {
        
            
       
        finaldata.map((item,key) => {
        
        return(
           
        <div className="card col-3">
            <div className="card-body">
                <h3 className="rec-title">{item.sender}</h3>
                <p className="rec">Name :- {item.name}</p>
                <p className="rec">Phone:- {item.phone}</p>
                <p className="rec">Email:- {item.email}</p>
                <p className="rec">Date:- {item.date}</p>
                <p className="rec">Location:- {item.location}</p>
                <p className="mb-2 rec">Restaurant:- {item.restaurant}</p>
                <input type='submit' name='signup' id='signup' className='btn btn-success req' 
                            value='Accept' onClick={event => AcceptData(event,key)}/>
                <input type='submit' name='signup' id='signup' className='btn btn-danger req' 
                            value='Reject' onClick={event => RejectData(event,key)}/>
            </div>
        </div>
        )}
        )
       
        }
        
        </div>
        {/* <section className='signup'>
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
        </section> */}
        </>
    )

}


export default ReceiveRequest;