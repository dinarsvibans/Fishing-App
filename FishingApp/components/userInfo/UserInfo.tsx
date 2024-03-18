'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from './Userinfo.module.css';

type UserType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  fishes: Array<{
    fishName: string;
    fishLength: string;
    fishWeight: string;
    fishingRodName: string;
    fishingRodLength: string;
    fishingRodTest: string;
    biteName: string;
    fishingLineType: string;
    photo: string;
  }>;
};

const UserInfo = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  console.log(userInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = session?.user?.email;
        console.log(email);
        if (email) {
          const res = await fetch(`api/userinfo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (!res.ok) {
            throw new Error('Failed to fetch user information');
          }

          const data = await res.json();
          setUserInfo(data.user);
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
        {userInfo?.fishes.map((fish, index) => (
         <div className={style.fishCell} key={index}>
         <div className={style.imageWrapper}>
           <Image
             src={fish.photo}
             alt="Fish"
             layout="fill"
             objectFit="contain"
           />
         </div>
       </div>
       
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
