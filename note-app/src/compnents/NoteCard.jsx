import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const formatTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-2 py-1 bg-slate-100 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ${isPinned ? 'border-primary' : ''}`}>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{formatDate(date)}</span>
        </div>
        <MdOutlinePushPin 
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`} 
          onClick={onPinNote}
        />
      </div>
      <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}...</p>
      {formatTags(tags)}
      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center gap-2'>
          <MdCreate
            className='icon-btn hover:text-green-600'
            onClick={onEdit}
          />
          <MdDelete
            className='icon-btn hover:text-red-500'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;