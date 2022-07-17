import React,{useState,useEffect} from 'react'

const Home = () =>{

    const [userName,setUserName] = useState('');
    const [show,setShow]= useState(false);


    const userHomePage = async () => {
        try{
            const res = await fetch('/getdata',{

                method: "GET",
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                }
              
             } )
             const data = await res.json();
             setUserName(data.name);
             setShow(true);
            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        userHomePage();
    },[]);

    return (
        <>
        <div className='home'>
        <div className='text-center mx-auto home-div'>
                <h2 className=''>WELCOME!</h2>
                <h1>{userName}</h1>
                <h1>{ show ? 'Happy, too see you back' : '121 Planner Service'}</h1>
        </div>
        </div>
        </>
    )
}

export default Home