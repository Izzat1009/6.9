import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner'
import "./hero.css"
import { use } from 'react';

const Hero = () => {
    const FnameRef = useRef(null)
    const LnameRef = useRef(null)
    const ageRef = useRef(null)
    const professionRef = useRef(null)
    const genderRef = useRef(null)
    const bioRef = useRef(null)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)
    const [isOpen, setIsOpen] = useState(null);


    const handleCreate = e => {
        e.preventDefault()
        const fname = FnameRef.current.value
        const lname = LnameRef.current.value
        const age = ageRef.current.value
        const profession = professionRef.current.value
        const gender = genderRef.current.value
        const bio = bioRef.current.value


        if(!fname || !lname){
            return toast.warning("biror nima yozing")
        }

        if(edit){
            setData(prev => prev.map((item)=> item.id === edit.id ? {...edit, title,desc} : item))
            setEdit(null)
        
        
        }else{

            const post = {
                id: uuidv4(),
                fname,
                lname,
                age,
                profession,
                gender,
                bio,
            }
            setData((prev)=> ([...prev, post]))
        }
        
        FnameRef.current.value = ""
        LnameRef.current.value = ""
        ageRef.current.value = ""
        professionRef.current.value = ""
        genderRef.current.value = ""
        bioRef.current.value = ""
    }
     
    const handledelete = (id) => {
        setData(prev => prev.filter((item)=> item.id !== id))
    }
     

    
  return (
    
    <div className='all'>
        <div className='title'>
            <h2>ReactJs-Users</h2>
        </div>
        <form onSubmit={handleCreate} action="">
            <input placeholder='fname' ref={FnameRef} className='border' type="text" />
            <input placeholder='lname' ref={LnameRef} className='border' type="text" />
            <input placeholder='age' ref={ageRef} type="number" className='border' />
            <input placeholder='profession' ref={professionRef} className='border'  type="text" />
            <input placeholder='gender' ref={genderRef} className='border' type="gender" />
            <input placeholder='bio' ref={bioRef} className='border' type="text" />
            <button className='button'>Create</button>
        </form>
        <div className='flex p-5 gap-3 flex-wrap'>
            {
                data?.map((item)=> (
                    <div key={item.id} className='fixed top-0 left-0 w-full h-screen bg-[#0005]'>
                        <div className='modal__desk  fixed top-[50%] left-[50%] w-[450px] min-h-[600px] translate-x-[-50%] translate-y-[-50%]'>
                        <h1 className='Text'>{item.fname}</h1>
                        <h1 className='Text2'>{item.lname}</h1>
                         <h1 className='Number'>{item.age}</h1>
                         <h2 className='Profession'>{item.profession}</h2>
                         <h1 className='Gender'>{item.gender}</h1>
                         <p className='bio'>{item.bio}</p>
                        <button onClick={() => handledelete(item.id)} className='button2'>Close</button>
                    </div>
                    </div>
                ))
            }
        </div>
        <Toaster/>
    </div>
  )
}

export default Hero