'use client';

import styles from './register.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();

  const initialDetails = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    fishes:[]
  };
  type Details = typeof initialDetails;
  const [registerDetails, setRegisterDetails] =
    useState<Details>(initialDetails);
  const [error, setError] = useState('');
  console.log(registerDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !registerDetails.name ||
      !registerDetails.surname ||
      !registerDetails.email ||
      !registerDetails.password ||
      !registerDetails.confirmPassword
    ) {
      setError('All fields needs to be filled');
      return;
    } else if (registerDetails.password !== registerDetails.confirmPassword) {
      setError('invalid password');
      return;
    }

    try {
      const doesUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: registerDetails.email }),
      });
      const { user } = await doesUserExists.json();
      if (user) {
        setError('User with this email allready exists');
        return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerDetails),
      });

      if (res.ok) {
        setRegisterDetails(initialDetails);
        setError('');
        router.push('/');
      }
    } catch (error) {
      console.log('Error accured during registration', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.form__input}
            type="text"
            id="name"
            value={registerDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="surname">
            Surname
          </label>
          <input
            className={styles.form__input}
            type="text"
            id="surname"
            value={registerDetails.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.form__input}
            type="text"
            id="email"
            value={registerDetails.email}
            onChange={handleInputChange}
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
            value={registerDetails.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form__inputWrapper}>
          <label className={styles.form__label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={styles.form__input}
            type="password"
            id="confirmPassword"
            value={registerDetails.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form__buttonWrapper}>
          <div className={styles.form__buttonWrapper}>
            <button className={styles.form__button} type="submit">
              Submit
            </button>
          </div>
        </div>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Register;
