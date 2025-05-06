import React, { useEffect, useState } from 'react'
import Navbar from '../compnents/Navbar'
import NoteCard from '../compnents/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utilis/axiosinstance'

function Home() {
  const [notes, setNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.error === false && response.data?.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new note
  const addNote = async (noteData) => {
    try {
      const response = await axiosInstance.post("/add-note", noteData);
      if (response.data?.error === false) {
        getAllNotes(); // Refresh notes list
      }
      return response.data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  // Edit note
  const editNote = async (noteId, noteData) => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, noteData);
      if (response.data?.error === false) {
        getAllNotes(); // Refresh notes list
      }
      return response.data;
    } catch (error) {
      console.error("Error editing note:", error);
      throw error;
    }
  };

  // Delete note
  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data?.error === false) {
        getAllNotes(); // Refresh notes list
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  // Toggle pinned status
  const togglePinNote = async (noteId, isPinned) => {
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !isPinned
      });
      if (response.data?.error === false) {
        getAllNotes(); // Refresh notes list
      }
      return response.data;
    } catch (error) {
      console.error("Error pinning note:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto'>
        {isLoading ? (
          <div className='flex justify-center mt-8'>Loading notes...</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(note.createdAt).toLocaleDateString()}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => {
                  setOpenAddEditModal({
                    isShown: true,
                    type: "edit",
                    data: note,
                  });
                }}
                onDelete={() => deleteNote(note._id)}
                onPinNote={() => togglePinNote(note._id, note.isPinned)}
              />
            ))}
          </div>
        )}
      </div>
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          onSave={(noteData) => {
            if (openAddEditModal.type === "add") {
              addNote(noteData);
            } else {
              editNote(openAddEditModal.data._id, noteData);
            }
          }}
        />
      </Modal>
    </>
  );
}

export default Home;