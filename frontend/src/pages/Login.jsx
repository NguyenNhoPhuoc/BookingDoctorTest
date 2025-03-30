import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
const Login = () => {
  const {backendURL,token,setToken} = useContext(AppContext)
  const [state, setState] = useState('Đăng ký')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (password.length < 8) {
        toast.error("Mật khẩu phải dài ít nhất 8 ký tự.");
        return;
    }
    try {
      if(state === 'Đăng ký') {
          const {data} = await axios.post(backendURL + '/api/user/register', {
            name,
            email,
            password
          })
    
          
          if(data.success) {
            setToken(data.token)
            localStorage.setItem('token', data.token)
            toast.success("Account created successfully")
          } else {
            toast.error(data.message)
          }
      } else {
        const {data} = await axios.post(backendURL + '/api/user/login', {
          email,
          password
        })
        if(data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          toast.success("Logged in successfully")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Đăng ký' ? "Tạo tài khoản" : "Đăng nhập"}</p>
        <p>Vui lòng {state === 'Đăng ký' ? "đăng ký" : "đăng nhập"} để đặt lịch khám</p>
        {
          state === 'Đăng ký' && <div className='w-full'>
            <p>Họ và tên</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }


        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p>Mật khẩu</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state === 'Đăng ký' ? "Tạo tài khoản" : "Đăng nhập"}</button>
        {
          state === "Đăng ký"
            ? <p>Đã có tài khoản? <span onClick={() => setState('Đăng nhập')} className='text-[#6366f1] underline cursor-pointer'>Đăng nhập ở đây</span></p>
            : <p>Tạo tài khoản mới? <span onClick={() => setState('Đăng ký')} className='text-[#6366f1] underline cursor-pointer'>Click vào đây</span></p>
        }
      </div>
    </form>
  )
}

export default Login