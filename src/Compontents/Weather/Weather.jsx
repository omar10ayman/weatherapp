import React, { useEffect, useState } from 'react'
import "./weather.css"
import axios from "axios"
import search_icon from "../../Assets/search.png"
import clear from "../../Assets/clear.png"
import humidity from "../../Assets/humidity.png"
import wind from "../../Assets/wind.png"
export default function Weather() {
  const[temp,setTemp]=useState("")
  const[humidityValue,sethumidity]=useState("")
  const[windValue,setwind_kph]=useState("")
  const[cityName,setCityName]=useState("")
  const[icon,setIcon]=useState("")
  useEffect(()=>{
  getApi()
  },[])
  const getApi= async()=>{
    let res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=db821fe9abc348ce84193246231910&q=Cairo`)
        setTemp(res.data.current.temp_c)
        sethumidity(res.data.current.humidity)
        setwind_kph(res.data.current.wind_kph)
        setCityName(res.data.location.name)
        setIcon(res.data.current.condition.icon)
        console.log(res.data)
  }
  const  search = async ()=>{
    let inputSearch =document.getElementById("inputSearch").value
    let upperletter =inputSearch[0].toUpperCase()+ inputSearch.slice(1)
    console.log(upperletter)
    if(upperletter===""){
      return 0;
    }else {
      let res =await axios.get(`http://api.weatherapi.com/v1/current.json?key=db821fe9abc348ce84193246231910&q=${upperletter}`)
        setTemp(res.data.current.temp_c)
        sethumidity(res.data.current.humidity)
        setwind_kph(res.data.current.wind_kph)
        setCityName(res.data.location.name) 
        setIcon(res.data.current.condition.icon)
        console.log(res.data.current.temp_c)
    }
  } 
  return (
    <div className='container rounded rounded-5 d-flex flex-column justify-content-center'>
      <div className="d-flex flex-row justify-content-around align-items-center px-5">
        <input id={"inputSearch"} type='text' className='rounded rounded-5 my-4 p-2 border border-0 w-75 d-inline' placeholder='Enter Your City'/>
        <div onClick={search} className="search_icon"><img src={search_icon}/></div>
      </div>
      <div>
        <div>
          <img className='w-25' src={icon}/>
          <h1>{cityName}</h1>
          <h2 className=''>{temp} <span>&deg;C</span></h2>
         <div className='d-flex justify-content-around align-items-center my-5'>
         <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
            <img src={humidity} alt="" />
            <div>
            <h4>{humidityValue} %</h4>
            <h6>Humidity</h6>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
            <img src={wind} alt="" />
            <div>
            <h4>{windValue} Km/h</h4>
            <h6>Wind speed</h6>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  )
}
