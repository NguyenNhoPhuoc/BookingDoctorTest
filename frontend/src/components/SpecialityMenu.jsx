import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';
const SpecialityMenu = () => {
  useEffect(() => {
    if (specialityData) {
      const specialities = specialityData.map(item => item.speciality);
  console.log(specialities);
    } else {
      console.log('specialityData is empty');
    }
  }, []);
  return (
    
    <div id='speciality'>
        <h1>Find by Speciality </h1>
        <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div>
            {specialityData.map((item,index)=> (
                <Link to={`/doctors/${item.speciality}`}>
                        <img src={item.image} alt="" />
                        <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
