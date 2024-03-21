'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Fish } from '../addFishingTrip/addFish';
import Image from 'next/image';
import style from './Userinfo.module.css';

export type UserType = {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

const UserInfo = () => {
  const { data: session } = useSession();
  
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [fishInfo, setFishInfo] = useState<Fish[] | null>(null)
  console.log('userInfo',userInfo);
  console.log('fishInfo',fishInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = (session?.user as { _id?: string })?._id ?? '';
        console.log('userId',userId);
        if (userId) {
          const res = await fetch(`api/userinfo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          if (!res.ok) {
            throw new Error('Failed to fetch user information');
          }

          const data = await res.json();
          setUserInfo(data.userInfo);
          setFishInfo(data.fishes)
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="container">
      <h2>Last catches</h2>
      <div className={style.fishGrid}>
        {fishInfo && fishInfo.map((fish, index) => (
          <div className={style.fishCell} key={index}>
            <Image
              src={fish.photo}
              alt="Fish"
              fill
              priority
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
