import defaultAvatar from '../assets/img/default_avatar.jpg'
import { BsGearWide } from 'react-icons/bs'
import { IoIosMore } from 'react-icons/io'
import { FaUserCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPosts, getUser, followUser, unfollowUser } from '../api/request'
import { updateFollowing } from '../store/user'
import '../assets/css/app.css'
import FollowManager from '../components/FollowManager'
import LandingPost from '../components/LandingPost'

function App() {
    const [selfMode, setSelf] = useState(false)
    const [user, setUser] = useState(null)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [post, selectPost] = useState(null)
    const [showAlertBox, setAlert] = useState(false)
    const [showFollowersBox, setFollowersBox] = useState(false)
    const [showFollowingBox, setFollowingBox] = useState(false)
    const currentUser = useSelector(state => state.user)
    const path = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const unfollowManager = () => {
        setAlert(false)
        const data = {
            userID: currentUser.id,
            followToID: user.id
        }
        unfollowUser({ data: data, token: currentUser.token }, response => {
            setFollowers(response.followTo)
            dispatch(updateFollowing(response.user))
        })
    }

    const followManager = () => {
        const data = {
            userID: currentUser.id,
            followToID: user.id
        }
        followUser({ data: data, token: currentUser.token }, response => {
            setFollowers(response.followTo)
            dispatch(updateFollowing(response.user))
        })
    }

    const userManager = async () => {
        let response = await getUser({ username: path.username }, response => {
            setUser(response)
            setFollowers(response.followers)
            setFollowing(response.following)
        })
        if (!response) return navigate("/")
        getPosts(response.id, setPosts, setLoading)
    }

    // Warning box to unfollow
    const UnfollowAlertBox = () => {
        if (showAlertBox) return (
            <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box top-0' >
                <div onClick={() => setAlert(false)} className="h-screen w-full bg-black bg-opacity-60 absolute" ></div>
                <div className='bg-white h-[290px] relative w-[400px] z-30 rounded-xl  flex flex-col items-center overflow-hidden ' >
                    <img src={user.avatar ?? defaultAvatar} width='90' className='rounded-full mt-7 ' />
                    <div className='w-full min-h-[80px] border-b border-[#DBDBDB] flex items-center justify-center' >
                        <span className='text-sm' >Leave @{user.username}? </span>
                    </div>
                    <button onClick={unfollowManager} className=' active:bg-gray-200 w-full h-full flex items-center justify-center border-b border-[#DBDBDB]' >
                        <span className='font-bold text-sm text-red-500'>Takibi Bırak</span>
                    </button>
                    <button onClick={() => setAlert(false)} className=' active:bg-gray-200 w-full h-full flex items-center justify-center' >
                        <span className='text-sm'>İptal</span>
                    </button>
                </div>
            </div>
        )
    }

    // Selection of buttons suitable for the user
    const UserComponent = () => {

        // If the profile belongs to the person logged into the app:
        if (selfMode) return (
            <div className='flex items-center gap-3' >
                <span className='text-3xl font-thin' >{user.username}</span>
                <Link to="/edit" className='border border-[#DBDBDB] rounded px-[9px] py-[2px] ' >
                    <span className='font-semibold text-sm'  >Profili Düzenle</span>
                </Link>
                <BsGearWide size={25} />
            </div>

        )

        // If the person who logged in is following the profile
        if (!selfMode && followers.includes(currentUser.id)) {
            return (
                <div className='flex items-center gap-3' >
                    <span className='text-3xl font-thin' >{user.username}</span>
                    <button className='border border-[#DBDBDB] rounded px-[9px] py-[2px] ' >
                        <span className='font-semibold text-sm'  >Mesaj Gönder</span>
                    </button>
                    <button onClick={() => setAlert(true)} className='border border-[#DBDBDB] rounded px-[25px] py-[5px]' >
                        <FaUserCheck />
                    </button>

                    <IoIosMore size={25} />
                </div>
            )
        }

        // If the person who logged in the profile is not following
        if (!selfMode) {
            return (
                <div className='flex items-center gap-3' >
                    <span className='text-3xl font-thin' >{user.username}</span>
                    <button onClick={followManager} className='bg-[#139DF7] text-white rounded px-[20px] py-[2px] ' >
                        <span className='font-semibold text-sm'  >Takip Et</span>
                    </button>
                    <IoIosMore size={25} />
                </div>
            )
        }
    }

    useEffect(() => {
        if (!currentUser.token) return navigate("/login")

         // If the profile belongs to the person logged into the app:
        if (path.username == currentUser.username) {
            // Reset state and manage data.
            setFollowersBox(false)
            setFollowingBox(false)
            setSelf(true)
            setUser(currentUser)
            setFollowers(currentUser.followers)
            setFollowing(currentUser.following)
            getPosts(currentUser.id, setPosts, setLoading)
        }

        if (path.username !== currentUser.username) {
            // Reset state and manage data.
            setFollowersBox(false)
            setFollowingBox(false)
            setSelf(false)
            userManager()
        }
    }, [path])

    if (user) return (
        <div className='bg-[#FAFAFA] h-screen ' >
            <LandingPost 
                post={post} 
                user={user} 
                selectPost={selectPost}
            />
            <UnfollowAlertBox />
            <FollowManager
                showFollowersBox={showFollowersBox}
                setFollowersBox={setFollowersBox}
                followers={selfMode ? currentUser.followers : followers}
                self={selfMode}
            />
            <FollowManager
                showFollowingBox={showFollowingBox}
                setFollowingBox={setFollowingBox}
                following={selfMode ? currentUser.following : following}
                self={selfMode}
            />

            <div className='h-[60px] w-3' ></div>
            <main className='md:pt-[30px]' >
                <div className='md:w-[975px] mx-auto flex items-center flex-col justify-center px-5 mt-3 ' >

                    <section id='user-information' className='w-full h-[150px] relative flex items-start gap-5 md:gap-0 md:justify-between overflow-hidden' >
                        <div className='flex items-center justify-center md:min-w-[328px] ' >
                            <img src={user.avatar ?? defaultAvatar} className="rounded-full md:mr-[30px] w-[77px] md:w-[150px]  " />
                        </div>
                        <div className='h-full md:grow md:w-full flex items-start flex-col' >
                            <UserComponent />
                            <div className='mt-7 flex items-center justify-start w-full gap-8 ' >
                                <div className='flex items-center justify-center' >
                                    <span className='font-semibold mr-1 ' > {posts.length}</span>
                                    <span>gönderi</span>
                                </div>
                                <button onClick={() => setFollowersBox(true)} className='flex items-center justify-center' >
                                    <span className='font-semibold mr-1 ' > { selfMode ? currentUser.followers.length : followers.length } </span>
                                    <span>takipçi</span>
                                </button>
                                <div onClick={() => setFollowingBox(true)} className='flex items-center justify-center cursor-pointer' >
                                    <span className='font-semibold mr-1 ' > { selfMode ? currentUser.following.length : following.length} </span>
                                    <span>takip</span>
                                </div>
                            </div>
                            <span className='font-semibold mt-4' > {user.name} </span>
                            <span>{user.biography}</span>
                        </div>
                    </section>

                    <section className='w-full border-t border-[#DBDBDB] mt-14 flex items-center justify-center gap-20 ' >
                        <span className=' text-sm font-semibold border-t border-black py-4 cursor-pointer ' >GÖNDERİLER</span>
                        <span className=' text-sm text-[#928E9F] py-4 cursor-pointer ' >KAYDEDİLENLER</span>
                        <span className=' text-sm text-[#928E9F] py-4 cursor-pointer ' >ETİKETLENENLER</span>
                    </section>

                    <section className='w-full flex flex-wrap gap-7 items-center justify-center md:justify-start mb-5 ' >
                        {
                            posts.map((post, index) => (
                                <div key={index} onClick={() => selectPost(post)} className='w-[293px] h-[293px] cursor-pointer ' >
                                    <img src={post.image} className="object-cover h-full" />
                                </div>
                            )
                            )
                        }

                    </section>

                </div>
            </main>
        </div>
    )
}

export default App