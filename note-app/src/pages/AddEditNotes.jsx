import React, { useState, useEffect } from 'react';
import TagInput from '../compnents/TagInput';  
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utilis/axiosinstance';

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === 'edit' && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags || []);
    }
  }, [type, noteData]);

  const addNewNote = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      return response.data;
    } finally {
      setIsLoading(false);
    }
  };

  const editNote = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      return response.data;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    try {
      if (type === 'edit') {
        await editNote();
      } else {
        await addNewNote();
      }
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='relative'>
      <button 
         className='w-10 h-10 rounded-full flex items-center justify-center absolute -right-3 hover:bg-slate-50'
         onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400'/>
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none'
          placeholder='Go to Gym At 5'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} /> 
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button 
        className='btn-primary font-medium mt-5 p-3' 
        onClick={handleAddNote}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;