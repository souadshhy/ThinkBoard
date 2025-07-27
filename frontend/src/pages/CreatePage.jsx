import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import api from "../lib/axios"

const CreatePage = () => {
  const [loading, setLoading]= useState(false);
  const [content, setContent]= useState('');
  const [title, setTitle]= useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required")
      return
    }
    
    setLoading(true)
    try {
        await api.post("/notes", {
        title,
        content
        })
      toast.success("Note created successfully")
      navigate("/")
    } catch (error) {
     
      if(error.response.status === 429){
        toast.error("Slow down! You are creating notes too fast", {
          duration:4000,
          icon:"☠️"
        })
      }else{
        toast.error("Failed to create note")
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className=" min-h-screen bg-base-200">
      <div className='container py-8 px-4 mx-auto'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>
            <div className='card bg-base-100 '>
              <div className='card-body '>
                <h2 className='card-title text-4xl mb-4 '>Create New Note</h2>

                <form onSubmit={handleSubmit}>
                  <div className='form-control mb-4'>
                    <label className='label'>
                    <span className='label-text'> Title</span> 
                    </label>
                    <input className='input input-bordered'
                    type='text'
                    placeholder='Note Title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                  </div>
                  <div className='form-control mb-4'>
                    <label className='label'>
                    <span className='label-text'> Content</span> 
                    </label>
                    <textarea className='textarea textarea-bordered h-32' 
                    placeholder='Write your note here...'
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button type='submit' className='btn btn-primary' disabled={loading}>
                      {loading ? "Creating...": "Create Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage