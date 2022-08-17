import React, {useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import {cities} from "../data/cities"
let data1;

let num;


const SendRequest = () => {

        const history = useHistory();
    
        const [user,SetUser] = useState({
            username:"",date:"",location:"",restaurant:"",work:"",interest:""
        });
    
        let name,value;

       

        const handleInputs = (e) => {
            
            name = e.target.name;
            value = e.target.value;
            SetUser({...user,[name]:value});
            
        }

        const [param,SetParam] = useState({
            work:"",interest:""
        });

        

        const hotels = [["Ahmedabadi","Curry Kingdom","Indian Masala House","Spice Hub","Parantha Platform"],
                    ["Parantha Platform","Masala Chowk","Masala Maarke"],
                    ["Lounge Tamil","The Naan House"],
                    ["Dal Tadka","Masala Magic","The Naan House","Ahmedabadi","Curry Kingdom"],
                    ["Parantha Platform","Masala Chowk","Masala Maarke","The Spice Hut"],
                    ["The Spice Hut","Vada Pav Corner","Bhel Street"],
                    ["Masala Chowk","Masala Maarke","Chandni Chowk","Madras Cafe "],
                    ["Parantha Platform","Masala Chowk","Masala Maarke"],
                    ["The Papad House","Goan Cafe","Chaat Mahal","Desi Pakwan"],
                    ["Masala Booth","Goan Cafe","Chaat Mahal","Dilliwali Thali"]
                    ];

        const handleInputs1 = (e) => {
            console.log(e);
            name = e.target.name;
            value = e.target.value;
            SetParam({...param,[name]:value});
        }

        
       
        

       
        
        const PostData = async (e) => {
            e.preventDefault();
    
            

            const {username,date,location,restaurant} = user;
            // console.log(user)
            const status = "pending"
            const condition = "true"
            const sender = userData.username;
            const today = new Date();
            const currentdate = today.toLocaleString("en-US","Asia/Delhi");
           

            // console.log(sender,username)
    
            const res = await fetch('/SendRequest',{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    sender,username,currentdate,date,location,restaurant,status,condition
                })
                
            });
            const data = await res.json();
            // console.log(data)
    
            if(res.status === 422 || !data){
                window.alert("Plzz fill the info");
                // console.log("Plzz fill the info");
            }
            else{
                window.alert("Request sent Successfull");
                // console.log("Request Registration");
    
                history.push("/MeetingStatus");
            }
        }

        const [userData,setUserData] = useState({username:"",work:""});


        const userContact=async()=>{
            try{
                const res =await fetch('/getdata',{
                  method:"GET",
                  headers:{
                    "Content-Type":"application/json"
                  }
                });
                const data = await res.json();
                //console.log(data)
                setUserData({ ...userData, username: data.username, work: data.work });
                // if(userData){
                //     SetUser({...user,sender: data.username});
                // }
                
                // console.log(userData);
                if(!res.status===200){
                  const error = new Error(res.error);
                  throw error;
                }
    
            }
            catch(err){
              console.log(err);
    
            }
      }

      const [place, setPlaces] = useState([]);
      
      const getRes = async() => {
        try{
            let htls = [];

            if(user.location=="Ahmedabad"){
                num = 0;
            }
            else if(user.location=="Mumbai"){
                num=1;
            }
            else if(user.location=="Delhi"){
                num=2;
            }
            else if(user.location=="Bengaluru"){
                num=3;
            }
            else if(user.location=="Chennai"){
                num=4;
            }
            else if(user.location=="Pune"){
                num=5;
            }
            else if(user.location=="Surat"){
                num=6;
            }
            else if(user.location=="Bhopal"){
                num=7;
            }
            else if(user.location=="Vadodara"){
                num=8;
            }
            else if(user.location=="Nagpur"){
                num=9;
            }
            else if(user.location=="Rajkot"){
                num=5;
            }
            else if(user.location!="Choose Location"){
                num=3;
            }
            hotels[num].map(item =>{
                htls.push(item);
            })
            if(htls){
            setPlaces(htls);
            }

        }
        catch(err){
            console.log(err);
        }
      }

    useEffect(()=>{
        userContact();
        alluserContact();
    },[userData]);

   
    useEffect(()=>{
        getRes();
    },[user]);

    

    
    const [names, setNames] = useState([]);

    const [info,setInfo] = useState([]);

    const [personInfo,setpersonInfo] = useState({name:"",email:"",phone:""});

    const alluserContact=async()=>{

        try{
            const res = await fetch("/SendRequest",{headers: {method: "GET"}})
            const data = await res.json()
            // console.log(data)
           await setInfo(data)
            // setUserData({ ... alluserData, name: data.name, email: data.email, phone: data.phone, work: data.work });
            // console.log(userData);
            // if(!res.status===200){
            //   const error = new Error(res.error);
            //   throw error;
            // }
           

        }
        catch(err){
          console.log(err);

        }
       
        if(info){
            //console.log(info)
            
            // const mapping = data.map(item => {
            //     console.log("work",item.work)
            // })
            let filtered;
            if(param.interest!="Choose interest" && param.work=="None"){
                filtered = info.filter(item => item.interest===param.interest && item.username != userData.username);
            }
            else if(param.work!="Choose Profession" && param.interest=="None"){
                filtered = info.filter(item => item.work === param.work && item.username != userData.username);
            }
            else if(param.work!="Choose Profession" && param.interest!="Choose interest"){
               filtered = info.filter(item => item.interest===param.interest && item.work === param.work && item.username != userData.username);
            }
            else if(param.work=="Choose Profession" && param.interest=="Choose interest"){
                filtered = [];
            }
            else if(param.work=="None" && param.interest=="None"){
                filtered = [];
            }
            
           
            
            if(filtered){
                let namme = []
                filtered.map(item => {
                    namme.push(item.username)
                })
                if(namme){
                    setNames(namme)
                }
                // console.log(names)
            }
            

            
        }
        // console.log(user);
        if(info && user)
        {
            const pInfo = info.filter(item => item.username === user.username)
            if(pInfo){
                
                pInfo.map(item => {
                    setpersonInfo({...personInfo, name: item.name, email: item.email, phone: item.phone})
                })
                
                // console.log(personInfo)
            }

        }

      

  }

  useEffect(()=>{
    alluserContact();
},[param]);


  

       

    return (
        <>
        <section className='signup'>
            <div className='container text-center'>
            <div className='signup-content mt-5'>
                <div className='signup-form'>
                    <h2 className=''><u>Schedule Meeting</u></h2>
                    <form  method="POST" className='register-form' id='register-form'>
                        <div className='form-group'>

                        <div className='Form-element'>
                            <label htmlFor='work'>
                            <i class="zmdi zmdi-slideshow material-icons-name"></i>
                            <select type="text" name="work" id='work' value={param.work}
                            onChange={handleInputs1}>
                                <option selected>Choose Profession</option>
                                <option>Student</option>
                                <option>Teacher</option>
                                <option>Web Developer</option>
                                <option>App Developer</option>
                                <option>Doctor</option>
                                <option>Data Scientist</option>
                                <option>None</option>
                            </select>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='interest'>
                            <i class="zmdi zmdi-group-work material-icons-name"></i>
                            <select type="text" name="interest" id='interest' value={param.interest}
                            onChange={handleInputs1}>
                                <option selected>Choose interest</option>
                                <option>Computer science</option>
                                <option>Electrical</option>
                                <option>Chemical</option>
                                <option>Making website</option>
                                <option>Biology</option>
                                <option>Big data</option>
                                <option>None</option>
                            </select>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='name'>
                            <i class="zmdi zmdi-account material-icons-name"></i>
                            
                            <select type="text" name="username" id='username' value={user.username}
                            onChange={handleInputs}>
                                <option>Choose Person</option>
                                {names.length>0 ? names.map(name => <option>{name}</option>) : <option disabled="disabled" selected="selected">NO Person</option>}
                                
                            </select>
                            
                            </label>
                        </div>

                        <div className='Form-element info'>
                            <h4 className='info-title'><u>Person Info</u></h4>
                            <p>Name:- {personInfo.name}</p>
                            <p>Email:- {personInfo.email}</p>
                            <p>Phone:- {personInfo.phone}</p>
                        </div>

                      


                        <div className='Form-element'>
                            <label htmlFor='date'>
                            <i class="zmdi zmdi-calendar material-icons-name"></i>
                            <input type="date" name='date' id='date' autoComplete="off" 
                            value={user.date}
                            onChange={handleInputs}
                            placeholder='Date'/>
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='location'>
                            <i class="zmdi zmdi-gps-dot material-icons-name"></i>
                            <select type="text" name="location" id='location' value={user.location}
                            onChange={handleInputs}>
                                <option>Choose Location</option>
                                {cities.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}
                            </select>
                            
                            </label>
                        </div>

                        <div className='Form-element'>
                            <label htmlFor='name'>
                            <i class="zmdi zmdi-hotel material-icons-name"></i>
                            <select type="text" name="restaurant" id='restaurant' value={user.restaurant}
                            onChange={handleInputs}>
                                <option>Choose Restaurant</option>
                                {place.length>0 ? place.map(hotel => <option>{hotel}</option>) : <option disabled="disabled" selected="selected">NO Person</option>}
                            </select>
                            </label>
                        </div>
                        <div className='Form-element form-group'>
                            <input type='submit' name='signup' id='signup' className='btn btn-success' 
                            value='Send Req' onClick={PostData}/>
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

export default SendRequest;