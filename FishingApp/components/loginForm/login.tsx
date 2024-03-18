'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, error);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res && res.error){
        setError('invalid credentials')
        return
      }
      router.replace('dashboard')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.form__input}
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.form__input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <div className={styles.form__buttonWrapper}>
          <button className={styles.form__button} type="submit">
            Login
          </button>
          <Link href={'/register'}>
            <button className={styles.form__button}>Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
