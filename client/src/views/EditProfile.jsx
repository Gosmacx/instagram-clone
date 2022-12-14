import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import defaultAvatar from '../assets/img/default_avatar.jpg'
import { uploadAvatar, updateUser, removeAvatar } from '../api/request'
import { loginStore, removeAvatarStore } from '../store/user'

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [showAlert, setAlert] = useState(false)
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [biography, setBiography] = useState(null)
    const [mail, setMail] = useState(null)

    const removeAvatarManager = () => {
        setAlert(false)
        removeAvatar(
            { data: { id: user.id }, token: user.token },
            dispatch(removeAvatarStore())
        )
    }

    const updateInformation = () => {
        const data = {
            name: name ?? user.name,
            username: username ?? user.username,
            biography: biography ?? user.biography,
            mail: mail ?? user.mail,
            id: user.id
        }
        updateUser(
            { data: data, token: user.token },
            response => {
                dispatch(loginStore(response))
            })
    }

    const changeAvatar = (e) => {
        const data = new FormData()
        data.append("files", e.target.files[0])
        data.append("id", user.id)
        uploadAvatar({ data: data, token: user.token }, response => {
            dispatch(loginStore(response))
            setAlert(false)
        })
    }

    useEffect(() => {
        if (!user.token) return navigate("/");
    }, [])

    const AlertBox = () => {
        if (showAlert) return (
            <div className='fixed z-30 h-screen w-full flex items-center justify-center animate-box top-0' >
                <div onClick={() => setAlert(!showAlert)} className="h-screen w-full bg-black bg-opacity-60 absolute" ></div>
                <div className='bg-white h-[222px] relative w-[400px] z-30 rounded-xl  flex flex-col items-center overflow-hidden ' >
                    <div className='w-full min-h-[80px] border-b border-[#DBDBDB] flex items-center justify-center' >
                        <span className='font-bold text-lg' >Profil Foto??raf??n?? De??i??tir</span>
                    </div>
                    <button className=' active:bg-gray-200 w-full h-full flex items-center justify-center border-b border-[#DBDBDB] relative ' >
                        <span className='font-bold text-sm text-[#139DF7] ' >Foto??raf Y??kle</span>
                        <input
                            onInput={changeAvatar}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className='absolute w-full h-full opacity-0 '
                        />
                    </button>
                    <button onClick={removeAvatarManager} className=' active:bg-gray-200 w-full h-full flex items-center justify-center border-b border-[#DBDBDB]' >
                        <span className='font-bold text-sm text-red-500'>Mevcut Foto??raf?? Kald??r</span>
                    </button>
                    <button className=' active:bg-gray-200 w-full h-full flex items-center justify-center' >
                        <span className='text-sm'>??ptal</span>
                    </button>
                </div>

            </div>
        )
    }

    if (user.token) return (
        <div className="w-full h-screen flex items-center justify-center pt-[110px] " >
            <AlertBox />
            <div className="w-[933px] mx-auto my-auto h-[839px] bg-white border border-[#DBDBDB] flex " >
                <nav className="h-full flex flex-col border-r grow border-[#DBDBDB] " >
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4  font-semibold flex items-center justify-start border-l-2 border-black" >Profili d??zenle</a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        ??ifreyi de??i??tir
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Uygulamalar ve internet siteleri
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        E-posta bildirimleri
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        An??nda ilet bildirimleri
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Ki??ileri y??net
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Gizlilik ve g??venlik
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Giri?? hareketleri
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Instagram'dan E-postalar
                    </a>
                    <a href="#" className="w-full py-4 leading-5 pl-[30px] pr-4 flex items-center justify-start border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 " >
                        Yard??m
                    </a>
                </nav>
                <section className="min-w-[696px] h-full flex flex-col items-center " >
                    <div className="mt-8 flex relative items-center gap-7 w-full ml-64 " >
                        <img src={user.avatar ?? defaultAvatar} width="38" className='rounded-full border border-gray-300 ' />
                        <div className='h-full flex flex-col items-start' >
                            <span className='text-lg leading-5' >{user.username} </span>
                            <button onClick={() => setAlert(!showAlert)} className='text-[#139DF7] text-sm font-semibold ' >Profil foto??raf??n?? de??i??tir</button>
                        </div>
                    </div>

                    <div className='mt-5 w-full' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-start justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 ' >Ad??n</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input
                                    onInput={e => setName(e.target.value)}
                                    defaultValue={user.name}
                                    type="text"
                                    className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none'
                                />
                                <span className='text-[#8E8E8E] text-xs max-w-[355px] !leading-4 mt-4 ' >
                                    Ad??n ve soyad??n, takma ad??n veya i??letmenin ad?? gibi tan??nd??????n bir ad?? kullanarak insanlar??n hesab??n?? ke??fetmesine yard??mc?? ol.
                                </span>
                                <span className='text-[#8E8E8E] text-xs max-w-[355px] !leading-4 mt-3 ' >
                                    Ad??n?? 14 g??n i??inde sadece iki kez de??i??tirebilirsin.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 w-full' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-start justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 ' >Kullan??c?? Ad??</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input
                                    onInput={e => setUsername(e.target.value)}
                                    defaultValue={user.username}
                                    placeholder='Kullan??c?? Ad??'
                                    type="text"
                                    className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none'
                                />
                                <span className='text-[#8E8E8E] text-xs max-w-[355px] !leading-4 mt-4 ' >
                                    ??o??u durumda, kullan??c?? ad??n?? 14 g??n i??inde yeniden de??i??tirip tariksefa0 yapabileceksin. Daha fazla bilgi al
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 w-full' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-start justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 ' >??nternet Sitesi</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input
                                    placeholder='??nternet Sitesi'
                                    type="text"
                                    className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none '
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 w-full'  >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-start justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 ' >Biyografi</span>
                            </div>
                            <div className='flex flex-col ' >
                                <textarea
                                    onInput={e => setBiography(e.target.value)}
                                    defaultValue={user.biography}
                                    className='border border-[#DBDBDB] px-[10px] py-[6px] w-[355px] max-h-[60px] min-h-[60px] rounded-[3px] outline-none '
                                    placeholder='Biyografi'
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className=' w-full mt-7 ' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-start justify-start h-full ' >

                            </div>
                            <div className='flex flex-col ' >
                                <span className='text-[#8E8E8E] text-sm font-semibold max-w-[355px]' >Ki??isel bilgiler</span>
                                <span className='text-[#8E8E8E] text-xs max-w-[355px] !leading-4 ' >
                                    Hesap bir i??letme, evcil hayvan veya ba??ka bir ??ey i??in kullan??l??yor olsa da ki??iler bilgilerini gir. Bu k??s??mlar herkese a????k profilinde g??r??nmeyecek.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-3 w-full ' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-center justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 text-center ' >E-posta</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input
                                    onInput={e => setMail(e.target.value)}
                                    defaultValue={user.mail}
                                    placeholder='E-posta'
                                    type="text"
                                    className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none '
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 w-full ' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-center justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 text-center ' >Telefon numaras??</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input type="text" className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none ' placeholder='Telefon numaras??' />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 w-full ' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-center justify-start h-full ' >
                                <span className='font-semibold ml-auto px-8 text-center ' >Cinsiyet</span>
                            </div>
                            <div className='flex flex-col ' >
                                <input type="text" className='border border-[#DBDBDB] h-[30px] w-[355px] px-[10px] rounded-[3px] outline-none ' defaultValue='Erkek' />
                            </div>
                        </div>
                    </div>

                    <div className='mt-auto mb-8 w-full ' >
                        <div className='flex items-center h-full' >
                            <div className='min-w-[194px] flex items-center justify-start h-full ' >
                            </div>
                            <div className='flex flex-col ' >
                                <button onClick={updateInformation} className='w-full flex items-center px-3 justify-center bg-[#139DF7] h-[30px] rounded-[4px] ' >
                                    <span className='font-semibold text-white text-sm' >G??nder</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </section>
            </div>
        </div>
    )
}

export default App