import React, { useEffect, useState } from 'react';
import { getInitials } from '../utilis/helper';
import axiosInstance from '../utilis/axiosinstance';

const Profileinfo = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/get-user');
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
          ...
        </div>
        <div>
          <p className='text-sm font-medium'>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
          !
        </div>
        <div>
          <p className='text-sm font-medium'>Error loading profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(user?.fullname || '')}
      </div>
      <div>
        <p className='text-sm font-medium'>{user?.fullname || 'User'}</p>
        <button 
          className='text-sm text-slate-700  bg-red-300 p-1 rounded-xl' 
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profileinfo;