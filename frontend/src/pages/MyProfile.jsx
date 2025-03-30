import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
const MyProfile = () => {

  const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(true)
  const [image, setImage] = useState(false)

  const updateProfileData = async () => {
    try {
        const formData = new FormData()
        formData.append('name', userData.name)
        formData.append('phone', userData.phone)
        formData.append('address', userData.address)
        formData.append('gender', userData.gender)
        formData.append('dob', userData.dob)
        image && formData.append('image', image)

        const {data} = await axios.post(backendURL + '/api/user/update-profile', formData, {headers: {token}})
        if (data.success) {
          toast.success(data.message)
          setIsEdit(false)
          loadUserProfileData()
        } else {
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit ? (
          <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 aspect-square rounded opacity-80 object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />

          </label>
        ) : (
          <div className='w-36 rounded'>
            <img className='w-full h-full object-cover' src={userData.image} alt="" />
          </div>
        )
      }

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }


      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <input
                  className='bg-gray-50 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  type="text"
                  onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                  value={userData.address}
                  placeholder="Địa chỉ"
                />
              : <p className='text-gray-500'>
                {userData.address}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-[#6366f1] px-8 py-2 rounded-full hover:bg-indigo-700 hover:text-white transition-all cursor-pointer' onClick={updateProfileData}>Save information</button>
            : <button className='border border-[#6366f1] px-8 py-2 rounded-full hover:bg-indigo-700 hover:text-white transition-all cursor-pointer' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile