import { BsSearch, BsPlusSquare } from 'react-icons/bs'
import { MdHomeFilled } from 'react-icons/md'
import { RiMessengerLine } from 'react-icons/ri'
import { IoCompassOutline, } from 'react-icons/io5'
import instagramText from '../assets/img/instagram-text.png'
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from 'react'
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from '../assets/img/default_avatar.jpg'

import { toggleCreatePost } from '../store/user'

function App() {

  const route = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const logout = () => {
    location.reload()
  }

  const goUser = (username) => {
    if (!username) return;
    navigate(`/${username}`)
  }

  const blockRenderPaths = [
    "/login",
    "/register"
  ]

  if (blockRenderPaths.includes(route.pathname)) return null;

  if (user.token) return (
    <nav className='w-full h-[60px] border-b border-[#DBDBDB] flex items-center justify-center fixed bg-white z-10' >
      <div className='flex items-center justify-between w-[975px] px-5  ' >
        <Link className='mt-2' to="/" >
          <img src={instagramText} width="103" />
        </Link>
        <div className='w-[268px] h-9 rounded-[8px] bg-[#EFEFEF] relative md:flex items-center justify-center px-4 ml-[162px] hidden  ' >
          <BsSearch color='#9A9A9A' />
          <input onKeyUp={e => e.key == 'Enter' ? goUser(e.target.value) : false} type="text" className='bg-transparent outline-none grow h-full ml-3 ' placeholder='Ara' />
        </div>
        <div className='flex items-center justify-center gap-5' >
          <Link to="/" >
            <MdHomeFilled size={28} />
          </Link>
          <RiMessengerLine size={28} />
          <BsPlusSquare onClick={() => dispatch(toggleCreatePost())} className='cursor-pointer' size={28} />
          <IoCompassOutline size={28} />
          <AiOutlineHeart size={28} />

          <button className='relative group' >
            <img src={user.avatar ?? defaultAvatar} width="24" className='rounded-full cursor-pointer border border-gray-300 ' />
            <div className='w-[230px] h-[198px] hidden group-focus-within:flex bg-white z-10 shadow-lg rounded py-2 absolute -right-5 top-8 flex-col  ' >
              <Link to={user.username} className='w-full flex items-center justify-start px-4 transition-all hover:bg-gray-100 h-12 cursor-pointer ' >
                <span className='text-sm' >Profil</span>
              </Link>
              <div className='w-full flex items-center justify-start px-4 transition-all hover:bg-gray-100 h-12 cursor-pointer ' >
                <span className='text-sm' >Kaydedildi</span>
              </div>
              <div className='w-full flex items-center justify-start px-4 transition-all hover:bg-gray-100 h-12 cursor-pointer ' >
                <span className='text-sm' >Ayarlar</span>
              </div>
              <div className='w-full flex items-center justify-start px-4 transition-all hover:bg-gray-100 h-12 cursor-pointer ' >
                <span className='text-sm' >Hesap Değiştir</span>
              </div>
              <div onClick={logout} className='w-full flex items-center justify-start px-4 transition-all hover:bg-gray-100 h-12 cursor-pointer ' >
                <span className='text-sm' >Çıkış Yap</span>
              </div>
            </div>
          </button>

        </div>
      </div>
    </nav>
  )
}

export default App