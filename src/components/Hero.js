
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllWeather, addCity } from '../features/weather/weatherSlice';
import getLocation from '../functions/getLocation';
import Display_data from './Display_data';
import Error from './Error';



const Hero = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getLocation({ setLocation, setLoading, setError });

  }, []);
  console.log(location)

  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather)
  console.log("weather data:",weatherData)
  const [redux, setRedux] = useState(false);
  const [city, setCity] = useState("");

  if (weatherData.isLoading) {
    return (
      <h1 >...Loading</h1>
    )
  }

  const handlesubmit = () => {
    dispatch(addCity(location.city))
    dispatch(getAllWeather());


    setRedux(true);

  }
  const handleSelected = () => {
    if(city)
    {
      dispatch(addCity(city));
      dispatch(getAllWeather());
      setRedux(true);
    }
    else{
alert("City name should not be empty");
    }
   
  }

  return (
    <>
 

      <div className={`w-full ${redux? "h-[2000px]":"h-screen"}  bg-[#1C2257] flex flex-col gap-6 items-center justify-center`}>
        <h1 className='text-white text-xl font-bold'>My Weather app</h1>
        <div className='w-5/6 h-5/6 bg-[#061543] rounded-3xl flex flex-col items-center gap-6'>
          {/* <input onChange={(e)=>setCity(e.target.value)}/> */}
          <h1 className='text-white mt-12'>Get Your Location's Weather  Data</h1>
          {location === null &&
            <Error />
          }
          {location !== null &&
            <button onClick={handlesubmit} className='bg-black text-white w-20'>GET</button>
          }

          {/* { usersData.users.map((user, index) => (
      
        <div className='text-white' key={index}>{user.base}</div>

        
    
     
      ))} */}
          {weatherData?.data?.message==="city not found"?( <h1 className='text-red-500 mt-12'>Enter valid city name</h1>):(redux && <Display_data />)}
     {/* {redux &&  <Display_data /> } */}
          <div className=' text-white flex flex-col items-center justify-center gap-5'>
            <h1>Or Search any City or Country</h1>
            <input className="text-black" onChange={(e) => { setCity(e.target.value) }} />
            <button onClick={handleSelected} className='bg-black text-white w-20'>Submit</button>
          </div>


        </div>
      </div>
    </>
  )
}

export default Hero