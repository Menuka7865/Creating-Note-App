import React, { useState, useEffect, useRef } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {  
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "" && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    // Focus input after removing tag
    inputRef.current?.focus();
  };

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      {/* Tags display */}
      {tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-2'>
          {tags.map((tag, index) => (  
            <span 
              key={`${tag}-${index}`} 
              className='inline-flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full'
            >
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className='text-gray-500 hover:text-red-500 focus:outline-none'
                aria-label={`Remove tag ${tag}`}
              >
                <MdClose size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className='flex items-center gap-2'>
        <input
          ref={inputRef}
          type="text"
          className='flex-1 text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Add tags...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Add tags"
        />
        <button
          className='flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          onClick={addNewTag}
          aria-label="Add tag"
          disabled={inputValue.trim() === ""}
        >
          <MdAdd size={18} />
        </button>
      </div>
      
      {/* Help text */}
      <p className='mt-1 text-xs text-gray-500'>
        Press Enter or click the + button to add tags
      </p>
    </div>
  );
};

export default TagInput;