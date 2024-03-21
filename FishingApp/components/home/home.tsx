'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import style from './home.module.css';
import RealtiveTime from '../../utils/relativeTime';

import { Fish } from '../addFishingTrip/addFish';

const AllUsersInfo = () => {
  const [latestPosts, setLatestPosts] = useState<Fish[] | null>(null);
  console.log(latestPosts);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/latestPosts');
        setLatestPosts(res.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.fishGrid}>
        {latestPosts &&
          latestPosts.map((post, index) => (
            <div key={index} className={style.card}>
              <div>
                <span className={style.postAuthor}>{post.fisherManName}</span>
                {' '}
                {post.createdAt && (<span>Posted {RealtiveTime(new Date(post.createdAt))}</span>)}
              </div>

              <div className={style.cardImage}>
                <Image
                  src={post.photo}
                  alt="Fish"
                  fill
                  priority
                  objectFit="cover"
                  className={style.image}
                />
              </div>
              <span>{post.fishWeight} KG and {post.fishLength}{' '}CM</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsersInfo;
