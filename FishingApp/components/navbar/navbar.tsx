'use client';

import Link from 'next/link';
import style from './navbar.module.css';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className={style.navbar}>
      {!session && (
        <>
          <Link href={'/'}>Home</Link>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Register</Link>
        </>
      )}
      {session && (
        <>
          <Link href={'/'}>Home</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'/dashboard/addfish'}>Add fish</Link>
          <div className={style.logotAndUsername}>
            <span className={style.userName}>hello {session?.user?.name}</span>
            <button onClick={() => signOut()}>LogOut</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
