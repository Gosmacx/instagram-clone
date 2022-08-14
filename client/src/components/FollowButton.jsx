import { useDispatch, useSelector } from "react-redux"
import { followUser, unfollowUser } from "../api/request"
import { updateFollowing } from "../store/user"

function App({ user, followers, setFollowers }) {
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    const unfollowManager = () => {
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

    if (followers.includes(currentUser.id)) return (
        <button onClick={unfollowManager} className='border-[#DBDBDB] border rounded px-[20px] py-[2px] ' >
            <span className='font-semibold text-sm'  >Takiptesin</span>
        </button>
    )

    if (!followers.includes(currentUser.id)) return (
        <button onClick={followManager} className='bg-[#139DF7] text-white rounded px-[20px] py-[2px] ' >
            <span className='font-semibold text-sm'  >Takip Et</span>
        </button>
    )
}

export default App