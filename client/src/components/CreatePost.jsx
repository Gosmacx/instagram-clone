import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createPostImg from '../assets/img/createpostimg.png'
import defaultAvatar from '../assets/img/default_avatar.jpg'
import { toggleCreatePost } from '../store/user';
import { BiArrowBack } from 'react-icons/bi'
import { createPost } from '../api/request'
import '../assets/css/app.css'
import { useNavigate } from 'react-router-dom';

function App() {

    const [hasFile, setFile] = useState(null)
    const [imgSelected, setSelect] = useState(false)
    const [boxStyle, setStlye] = useState({
        width: '39.5%'
    })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const nextStep = () => {
        setStlye({ width: '57%' })
        setSelect(true)
    }

    const sendPost = () => {
        let content = document.getElementById("postContent").value
        if (!content || !hasFile) return;
        let data = new FormData()
        data.append("files", hasFile)
        data.append("userID", user.id)
        data.append("content", content)
        data.append("date", Date.now())
        createPost({ data: data, token: user.token }, () => {
            navigate("#")
            dispatch(toggleCreatePost())
            reset()
        })
    }

    const reset = () => {
        setStlye({ width: '39.5%' })
        setFile(null)
        setSelect(null)
    }

    const SelectFileComponent = () => {
        if (!hasFile) {
            return (
                <div className="grow w-full flex items-center justify-center flex-col gap-6 " >
                    <img src={createPostImg} width='80' />
                    <span className='font-thin text-[22px] ' >Fotoğrafları ve videoları buraya sürükle</span>
                    <div className='relative' >
                        <button className='bg-[#0095f6] w-[125px]  text-sm font-semibold rounded-[3px] flex justify-center items-center h-8 text-white ' >Bilgisayardan seç</button>
                        <input onInput={e => setFile(e.target.files[0])} type="file" className='absolute top-0 opacity-0 cursor-pointer' />
                    </div>
                </div>
            )
        } else {
            return (
                <div className='relative grow w-full mt-11 ' >
                    <img src={URL.createObjectURL(hasFile)} id='imgPreview' className='object-cover w-full h-full ' />
                </div>
            )
        }
    }

    const ButtonComponent = () => {
        if (!hasFile && !imgSelected) 
            return null
            
        if (hasFile && imgSelected ) 
            return <button onClick={sendPost} className='text-[#0095f6] text-sm font-semibold' >Paylaş</button>
            
        if (hasFile) 
            return <button onClick={nextStep} className='text-[#0095f6] absolute text-sm font-semibold right-4 ' >İleri</button>
    }

    const CreatePost = () => {
        return (
                <div className='relative flex items-center justify-center grow w-full' >
                    <div className='w-full h-full relative flex items-center justify-center ' >
                        <img src={URL.createObjectURL(hasFile)} id='imgPreview' className='object-cover w-full h-full ' />
                    </div>
                    <div className='bg-white w-[45%] h-full border-l border-[#DBDBDB] flex flex-col py-4 mt-24 ' >
                        <div className='flex items-center justify-start gap-3 w-full ml-4 ' >
                            <img src={user.avatar ?? defaultAvatar} width='28' className='rounded-full' />
                            <span className=' font-bold' > {user.username} </span>
                        </div>
                        <textarea id='postContent' cols="30" rows="6" className='px-4 mt-4 outline-none' placeholder='Açıklama yaz..' >

                        </textarea>
                    </div>
                </div>
        )
    }

    if (user.showCreatePost) return (
        <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box  ' >
            <div onClick={() => dispatch(toggleCreatePost())} className="h-full w-full bg-black bg-opacity-60" ></div>

            <div style={boxStyle} className="bg-white h-[82%] absolute z-40 rounded-[10px] flex flex-col items-center justify-center overflow-hidden transition-all " >
                <div className="h-11 flex items-center justify-between bg-white border-b border-[#DBDBDB] w-full px-4 absolute z-50 top-0 " >
                    <button onClick={reset} >
                        <BiArrowBack size={30} />
                    </button>
                    <span className="font-semibold" >Yeni gönderi oluştur</span>
                    <div></div>
                    <ButtonComponent/>
                </div>
                {hasFile && imgSelected ?
                    <CreatePost/> : 
                    <SelectFileComponent/>
                }
                
            </div>

        </div>
    )
}

export default App