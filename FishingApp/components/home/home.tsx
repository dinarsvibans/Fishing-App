'use client'

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { UserType } from '../userInfo/UserInfo';

const AllUsersInfo = () => {
  const [usersInfo, setUsersInfo] = useState<UserType[] | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/allUsers');
        console.log(res.data)
        setUsersInfo(res.data);
        console.log(usersInfo); 
        console.log('test')// Log the updated usersInfo
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      {/* Render your usersInfo here */}
      {usersInfo && usersInfo.map((user) => (
        <div key={user._id}>
          {/* Render user information */}
          <p>{user.name}</p>
          <p>{user.email}</p>
          {/* You can render other user information as needed */}
        </div>
      ))}
    </div>
  );
};

export default AllUsersInfo;
