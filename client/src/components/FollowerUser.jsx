import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUser, removeFollower } from "../api/request"
import defaultAvatar from '../assets/img/default_avatar.jpg'
import { updateFollowers } from "../store/user"
import FollowButton from './FollowButton'

function App({ id, self, mode }) {
    const [user, setUser] = useState(null)
    const [followers, setFollowers] = useState([])
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useState(() => {
        if (!user) {
            getUser({ id: id }, response => {
                setUser(response)
                setFollowers(response.followers)
            })
        }
    }, [id])

    const removeManager = () => {
        const data = {
            data: {
                id: currentUser.id, 
                removeID: user.id
            },
            token: currentUser.token
        }
        removeFollower(data, response => {
            dispatch(updateFollowers(response.user))
            setUser(null)
        })
    }

    const ButtonManager = () => {
   
        if (user.id == currentUser.id) return null

        if (self && mode == 'followers') return (
            <button onClick={removeManager} className='border border-[#DBDBDB] flex items-center justify-center px-2 py-1 rounded ' >
                <span className='text-sm font-semibold' >Çıkar</span>
            </button>
        )

        return <FollowButton user={user} setFollowers={setFollowers} followers={followers} />
    }

    if (user) return (
        <div className='w-full items-center flex justify-between px-4 py-2 ' >
            <Link to={`/${user.username}`} className='flex relative items-start gap-4 cursor-pointer ' >
                <img src={user.avatar ?? defaultAvatar} width='40' className='rounded-full' />
                <div className='h-full flex flex-col items-start' >
                    <span className='text-sm font-semibold' >{user.username}</span>
                    <span className='text-sm text-[#bcbcbc] ' >{user.name}</span>
                </div>
            </Link>
            <ButtonManager />
        </div>
    )
}

export default App