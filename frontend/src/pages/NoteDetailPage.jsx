import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import {  ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();




  useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note: ", error)
        toast.error("Failed to get the note");
      }finally{
        setLoading(false)
      }
    }

    fetchNote();

  }, [id])
   
  if(loading){
    return(
    <div className='min-h-screen flex justify-center items-center bg-base-200'>
      <LoaderIcon className=' animate-spin size-10' style={{animationDuration:'5s'}}/>

    </div>)
  }

  const handleDelete= async ()=>{
    if(!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate('/')
    } catch (error) {
      console.log("Error handleDelete: ", error)
      toast.error("Failed to delete the note")
    }
  }

  const handleSave= async (e)=>{
    e.preventDefault()
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully")
      navigate('/');
    } catch (error) {
      console.log("Error in handleSave: ", error);
      toast.error("Faild to update the note")
    }finally{
      setSaving (false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200' >
      <div className='container py-8 px-4 mx-auto'>
        <div className="mx-auto max-w-2xl">
            <div className='flex items-center justify-between mb-6'>
              <Link to="/" className='btn btn-ghost'>
                <ArrowLeftIcon className='size-5' />
                Back to Notes
              </Link>
              <button className="btn btn-error btn-outline" onClick={handleDelete} >
              <Trash2Icon className='size-5'/>
              Delete Note
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <form onSubmit={handleSave}>
                 
                  <div className="form-control mb-4">
                    <label className='label'>
                      <span className='label-text'>Title</span>
                    </label>
                    <input
                    value={note.title}
                    onChange={(e)=>{setNote({...note, title:e.target.value})}}
                    placeholder='Note Title'
                    className='input input-bordered'
                    type='text'
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className='label'>
                      <span className='label-text'>Content</span>
                    </label>
                    <textarea
                    value={note.content}
                    onChange={(e)=>{setNote({...note, content:e.target.value})}}
                    placeholder='Write your note here...'
                    className='input input-bordered h-32 py-3 px-5'
                    />
                  </div>

                  <div className="card-actions justify-end ">
                    <button className="btn btn-primary" type='submit' disabled={saving}>
                        {saving? 'Saving...': 'Save Changes'}
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

export default NoteDetailPage