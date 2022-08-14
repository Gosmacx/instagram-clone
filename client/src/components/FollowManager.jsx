import { GrClose } from 'react-icons/gr'
import FollowUserComponent from './FollowerUser'

function App({ showFollowersBox, showFollowingBox, setFollowersBox, setFollowingBox, followers, following, self }) {

    if (showFollowersBox && followers) return (
        <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box top-0' >
            <div onClick={() => setFollowersBox(false)} className="h-screen w-full bg-black bg-opacity-60 absolute" ></div>
            <div className='bg-white h-[290px] relative w-[400px] z-30 rounded-xl flex flex-col items-center overflow-hidden ' >
                <div className='w-full px-4 h-12 flex items-center justify-center border-b border-[#DBDBDB] ' >
                    <span className='font-semibold' >Takipçiler</span>
                    <GrClose size={25} className='absolute right-4 cursor-pointer' onClick={() => setFollowersBox(false)} />
                </div>
                <div className='w-full h-full flex flex-col items-center overflow-y-scroll ' >
                    {
                        followers.map((id, index) => <FollowUserComponent id={id} key={index} self={self} mode={following ? ' following' : 'followers'} />)
                    }
                </div>
            </div>
        </div>
    )


    if (showFollowingBox && following) return (
        <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box top-0' >
            <div onClick={() => setFollowingBox(false)} className="h-screen w-full bg-black bg-opacity-60 absolute" ></div>
            <div className='bg-white h-[290px] relative w-[400px] z-30 rounded-xl flex flex-col items-center overflow-hidden ' >
                <div className='w-full px-4 h-12 flex items-center justify-center border-b border-[#DBDBDB] ' >
                    <span className='font-semibold' >Takip Ettikleri</span>
                    <GrClose size={25} className='absolute right-4 cursor-pointer' onClick={() => setFollowingBox(false)} />
                </div>
                <div className='w-full h-full flex flex-col items-center overflow-y-scroll ' >
                    {
                        following.map((id, index) => <FollowUserComponent id={id} key={index} self={self} mode={following ? ' following' : 'followers'}  />)
                    }
                </div>
            </div>
        </div>
    )

}

export default App