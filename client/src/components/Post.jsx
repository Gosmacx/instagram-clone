import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsChat, BsBookmark } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { VscSmiley } from 'react-icons/vsc'
import { useEffect, useState } from 'react'
import { getUser } from '../api/request'
import defaultAvatar from '../assets/img/default_avatar.jpg'
import { useNavigate } from 'react-router-dom'

function App({ date, content, image, userID }) {

    const [user, setUser] = useState(null)
    const navigate = useNavigate() 
    const goUser = () => {
        navigate(`${user.username}`)
    }

    useEffect(() => {
        getUser({ id: userID }, setUser);   
    }, [])
    

    if (user) return (
        <div id='post' className='rounded-[8px] border border-[#DBDBDB] w-full flex flex-col overflow-hidden bg-white mt-4 ' >

            <div id='top-user-information' className='w-full flex items-center justify-between h-14 px-3 border-b border-[#DBDBDB]' >
                <div className='flex items-center justify-center gap-3' >
                    <img onClick={goUser} src={user.avatar ?? defaultAvatar} className="rounded-full cursor-pointer" width="32" />
                    <span onClick={goUser} className='text-sm font-semibold cursor-pointer' >{user.username}</span>
                </div>
                <FiMoreHorizontal size={20} />
            </div>

            <div id='post-content' className='w-full h-[470px] relative' >
                <img src={image} className="object-cover w-full h-full " />
            </div>

            <div id='user-activity' className='flex w-full justify-between h-[46px] items-center mt-1 px-3 pb-[6px]' >
                <div className='flex items-center justify-between gap-4' >
                    <AiOutlineHeart size={25} />
                    <BsChat size={25} />
                    <FiSend size={25} />
                </div>
                <BsBookmark size={25} />
            </div>

            <span className='font-semibold ml-3 text-sm mb-1' >81 beğenme</span>

            <div className='text-sm ml-3 mb-1' >
                <span className='font-semibold mr-2' >{user.username}</span>
                <span>{content}</span>
            </div>

            <span className='text-[#8E8E8E] text-sm ml-3 font-semibold mb-2 ' >100 yorumun tümünü gör</span>

            <span className='text-xs text-[#BFBFBF] ml-3 w-full mb-2 ' >4 SAAT ÖNCE</span>

            <div id="make-comment" className='w-full border-t border-[#DBDBDB] px-3 pb-1 flex items-center ' >
                <VscSmiley className='my-2 mr-3' size={28} />
                <input type="text" className='bg-transparent outline-none grow ' placeholder='Yorum ekle...' />
                <span className='text-[#BBE3FC] text-sm' >Paylaş</span>
            </div>

        </div>
    )
}

export default App