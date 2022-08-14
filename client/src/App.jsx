import me from './assets/img/me.jpg'
import post from './assets/img/post.jpg'

import { AiOutlineHeart } from 'react-icons/ai'
import { FiMoreHorizontal, FiSend } from 'react-icons/fi'
import { BsChat, BsBookmark } from 'react-icons/bs'
import { VscSmiley } from 'react-icons/vsc'
import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {


  return (
    <div className='bg-[#FAFAFA]' >

      <Navbar/>

      <main className='md:mx-auto md:w-[821px] flex' >

        <section className='w-[470px] mr-8 h-screen' >
          <div className='h-[85px] ' ></div>
          <div id='stories' className='w-[470px] h-[117px] py-4 rounded-[8px] border border-[#DBDBDB]' ></div>
          <div id='posts-section' className='mt-5 w-full' >
            <div id='post' className='rounded-[8px] border border-[#DBDBDB] w-full flex flex-col overflow-hidden' >

              <div id='top-user-information' className='w-full flex items-center justify-between h-14 px-3 border-b border-[#DBDBDB]' >
                <div className='flex items-center justify-center gap-3' >
                  <img src={me} className="rounded-full" width="32" />
                  <span className='text-sm font-semibold' >tariksefa0</span>
                </div>
                <FiMoreHorizontal size={20} />
              </div>

              <div id='post-content' className='w-full h-[470px] relative' >
                <img src={post} className="object-cover" />
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
                <span className='font-semibold mr-2' >tariksefa0</span>
                <span>Merhaba bu gün instagram clone yazıyorum</span>
              </div>

              <span className='text-[#8E8E8E] text-sm ml-3 font-semibold mb-2 ' >100 yorumun tümünü gör</span>

              <span className='text-xs text-[#BFBFBF] ml-3 w-full mb-2 ' >4 SAAT ÖNCE</span>

              <div id="make-comment" className='w-full border-t border-[#DBDBDB] px-3 pb-1 flex items-center ' >
                <VscSmiley className='my-2 mr-3' size={28} />
                <input type="text" className='bg-transparent outline-none grow ' placeholder='Yorum ekle...' />
                <span className='text-[#BBE3FC] text-sm' >Paylaş</span>
              </div>



            </div>
          </div>
        </section>

        <section className='w-[319px] relative mr-4 hidden md:flex flex-col items-center' >
          <div className='h-[95px]' ></div>

          <div className='w-[319px] flex items-center justify-between' >
            <div className='flex items-center justify-center gap-4' >
              <img src={me} width="56" className='rounded-full' />
              <div className='flex flex-col items-start ' >
                <span className='text-sm font-semibold' >tariksefa0</span>
                <span className='text-sm text-[#A2A2A2] ' >Tarık Sefa</span>
              </div>
            </div>
            <button className='text-[#139DF7] text-xs font-semibold'  >Geçiş Yap</button>
          </div>

          <div className='w-full flex items-center justify-between mt-4' >
            <span className='text-[#ACACAC] font-semibold text-sm' >Senin İçin Öneriler</span>
            <span className='text-xs  font-semibold' >Tümünü Gör</span>
          </div>

          <div className='flex items-center flex-col w-[340px] mt-1' >

            <div className='flex items-center justify-between px-4 py-2 w-full' >
              <div className='flex items-center justify-center gap-4' >
                <img src={me} className='rounded-full' width="32" />
                <div className='flex flex-col items-start' >
                  <span className='text-sm font-semibold' >tariksefa0</span>
                  <span className='text-xs  text-[#A2A2A2]' >Seni Takip Ediyor</span>
                </div>
              </div>
              <span className='text-[#139DF7] text-xs font-semibold mr-3' > Takip Et</span>
            </div>

            <div className='flex items-center justify-between px-4 py-2 w-full' >
              <div className='flex items-center justify-center gap-4' >
                <img src={me} className='rounded-full' width="32" />
                <div className='flex flex-col items-start' >
                  <span className='text-sm font-semibold' >tariksefa0</span>
                  <span className='text-xs  text-[#A2A2A2]' >Seni Takip Ediyor</span>
                </div>
              </div>
              <span className='text-[#139DF7] text-xs font-semibold mr-3' > Takip Et</span>
            </div>

            <div className='flex items-center justify-between px-4 py-2 w-full' >
              <div className='flex items-center justify-center gap-4' >
                <img src={me} className='rounded-full' width="32" />
                <div className='flex flex-col items-start' >
                  <span className='text-sm font-semibold' >tariksefa0</span>
                  <span className='text-xs  text-[#A2A2A2]' >Seni Takip Ediyor</span>
                </div>
              </div>
              <span className='text-[#139DF7] text-xs font-semibold mr-3' > Takip Et</span>
            </div>

            <div className='flex items-center justify-between px-4 py-2 w-full' >
              <div className='flex items-center justify-center gap-4' >
                <img src={me} className='rounded-full' width="32" />
                <div className='flex flex-col items-start' >
                  <span className='text-sm font-semibold' >tariksefa0</span>
                  <span className='text-xs  text-[#A2A2A2]' >Seni Takip Ediyor</span>
                </div>
              </div>
              <span className='text-[#139DF7] text-xs font-semibold mr-3' > Takip Et</span>
            </div>

          </div>


        </section>


      </main>

    </div>
  )
}

export default App