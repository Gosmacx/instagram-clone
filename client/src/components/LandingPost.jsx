import { AiOutlineHeart } from 'react-icons/ai'
import { BsChat, BsBookmark } from 'react-icons/bs'
import { VscSmiley } from 'react-icons/vsc'
import { FiSend } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import defaultAvatar from '../assets/img/default_avatar.jpg'

function App({ post, user, selectPost }) {
    if (post) return (
        <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box  ' >
            <div onClick={() => selectPost(null)} className="h-full w-full bg-black bg-opacity-60" ></div>

            <div className="bg-white w-[72%] h-[95%] absolute z-40 rounded-[6px] flex items-center justify-center overflow-hidden transition-all " >
                <div className='bg-black relative h-full w-[69%] flex items-center justify-center ' >
                    <img src={post.image} className='w-full h-full' />
                </div>
                <div className='h-full w-[40%] flex flex-col items-center ' >
                    <div className='w-full flex items-center px-4 mt-4 gap-3 pb-3 border-b border-[#DBDBDB] ' >
                        <img src={user.avatar ?? defaultAvatar} className="rounded-full" width='35' />
                        <span className='font-semibold text-sm' >{user.username}</span>
                        <GrClose size={25} className='absolute right-4 cursor-pointer' onClick={() => selectPost(null)} />
                    </div>

                    <div className='h-full w-full flex items-start px-4 border-b border-[#DBDBDB] mt-3 ' >
                        {/* <div className='w-full flex items-center ' >
                            <img src={defaultAvatar} width='28' className='rounded-full self-start' />
                            <div className='leading-3 ml-2 ' >
                                <span className='font-semibold text-sm mr-2' >tariksefa0</span>
                                <span className='text-sm' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit nam natus, quas deserunt vel eius quis voluptas cum error enim?</span>
                            </div>
                            <AiOutlineHeart size={40} className='self-start ml-4 ' />
                        </div> */}

                    </div>

                    <div className='w-full flex flex-col items-center' >
                        <div id='user-activity' className='flex w-full justify-between h-[46px] items-center px-4 pb-[6px]' >
                            <div className='flex items-center justify-between gap-4' >
                                <AiOutlineHeart size={25} />
                                <BsChat size={25} />
                                <FiSend size={25} />
                            </div>
                            <BsBookmark size={25} />
                        </div>
                        <span className='font-bold w-full text-sm block text-start px-4 mb-1 ' >16,555 beğenme</span>
                        <span className='text-xs text-[#BFBFBF] ml-3 w-full px-3 mb-6 ' >4 SAAT ÖNCE</span>
                        <div id="make-comment" className='w-full border-t border-[#DBDBDB] px-3 pb-1 flex items-center ' >
                            <VscSmiley className='my-2 mr-3' size={28} />
                            <input type="text" className='bg-transparent outline-none grow ' placeholder='Yorum ekle...' />
                            <span className='text-[#BBE3FC] text-sm' >Paylaş</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default App