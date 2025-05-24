'use client';

import React, { useEffect } from 'react'
import { useAuth } from '../../../utils/context/authContext';



function UserPage() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(`this is the user ID:`, user.uid)
  }, []);

  return (
    <div>
      this is the account page
    </div>
  )
}

export default UserPage;
