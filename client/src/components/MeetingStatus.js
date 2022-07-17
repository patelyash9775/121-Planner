import React,{useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const MeetingStatus = () =>{

    const [userData,setUserData] = useState();

    const userContact=async()=>{

        try{
            const res =await fetch('/getdata',{
              method:"GET"
            });
            const data = await res.json();
          
            setUserData(data.username);
           
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
    const [meeting,setMeeting] = useState([]);

    const meetingInfo = async() => {

        try{
            const res =await fetch('/MeetingStatus',{
                method:"GET"
              });
            
              const data = await res.json();
              await setInfo(data);
        }
        catch(err){
            console.log(err);
          }
        
        if(info && userData){
            // console.log("Data :- ",info)
            // console.log("Helloooooo")
            // console.log("userdata =",userData);
            // console.log("usernames :- ")
            info.map(item => {console.log(item.username)})
            const filtered = info.filter(item => item.username === userData || item.sender === userData)
            setMeeting(filtered);
            // console.log("Meeting:- ",meeting);
        }

    }

    
  useEffect(()=>{

    meetingInfo();
    userContact();
},[userData,info]);

    return (
        <>
     
        <div class="container mt-3">
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th>Person</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Restaurant</th>
                    <th>Status</th>
                    
                </tr>
                </thead>
                <tbody>
                
                {
                  
                    meeting.map(item => {
                     if(item.username === userData){
                      return(
                        <tr>
                        {/* console.log(item) */}
                        {}
                        <td>{item.sender}</td>
                        <td>{item.date}</td>
                        <td>{item.location}</td>
                        <td>{item.restaurant}</td>
                        <td>{item.status}</td>
                        </tr>
                        )
                    } 
                    else {
                      return (
                        <tr>
                        {/* console.log(item) */}
                      
                        <td>{item.username}</td>
                        <td>{item.date}</td>
                        <td>{item.location}</td>
                        <td>{item.restaurant}</td>
                        <td>{item.status}</td>
                        </tr>
                      )
                    }
                    })

                
                }
                
               
                </tbody>
            </table>
            </div>
        
        </>
)
}

export default MeetingStatus;