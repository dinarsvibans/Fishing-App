'use client';

import { useState, ChangeEvent } from 'react';
import style from './addFish.module.css';
import { getSession, useSession } from 'next-auth/react';

export interface Fish {
  fishName: string;
  fishLength: string;
  fishWeight: string;
  fishingRodName: string;
  fishingRodLength: string;
  fishingRodTest: string;
  biteName: string;
  fishingLineType: string;
  photo: string;
  user?:string;
  fisherManName?:string;
  createdAt?:string;
}

const AddFish = () => {
  const { data: session } = useSession();
  const userId = (session?.user as { _id?: string })?._id ?? '';
  console.log('userId',userId)
  console.log('sessionn', session);
  const [formState, setFormState] = useState<Fish>({
    fishName: '',
    fishLength: '',
    fishWeight: '',
    fishingRodName: '',
    fishingRodLength: '',
    fishingRodTest: '',
    biteName: '',
    fishingLineType: '',
    photo: '',
    
  });

  const handleInutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        setFormState({ ...formState, photo: dataURL });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/postFish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formState, userId }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        console.log('Fish data added successfully');
      } else {
        console.error('Failed to add fish data');
      }
    } catch (error) {
      console.error('Error during fishPost:', error);
    }
  };

  return (
    <div>
      <h1>Register your catched fish</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputDiv}>
          <label htmlFor="photo">
            Add a photo <span className={style.required}>*</span>
          </label>
          <input
            className={style.input}
            type="file"
            id="photo"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishName">
            {' '}
            Name of the fish <span className={style.required}>*</span>
          </label>
          <input
            className={style.input}
            type="text"
            id="fishName"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishLength">
            {' '}
            Length (cm) <span className={style.required}>*</span>
          </label>
          <input
            className={style.input}
            type="number"
            step="0.01"
            id="fishLength"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishweight"> Weight (kg)</label>
          <input
            className={style.input}
            type="number"
            step="0.01"
            id="fishWeight"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishingRodName"> Name of fishing rod used</label>
          <input
            className={style.input}
            type="text"
            id="fishingRodName"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishingRodLength"> Fishing rod length</label>
          <input
            className={style.input}
            type="number"
            step="0.01"
            id="fishingRodLength"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishingRodTest"> Fishing rod test</label>
          <input
            className={style.input}
            type="text"
        
            id="fishingRodTest"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="biteName"> What bait was used</label>
          <input
            className={style.input}
            type="text"
            id="biteName"
            onChange={handleInutChange}
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="fishingLineType"> Type of fishing line</label>
          <select
            className={style.input}
            id="fishingLineType"
            onChange={handleInutChange}
          >
            <option value=""></option>
            <option value="braided">Braided</option>
            <option value="monofilament">Monofilament</option>
            <option value="fluorocarbon">Fluorocarbon</option>
            <option value="copolymer">Copolymer</option>
            <option value="flyline">Fly line</option>
          </select>
          <div className={style.inputDiv}>
            <label htmlFor="lineThickness">Fishing line thickness(mm)</label>
            <input
              className={style.input}
              type="number"
              step="0.01"
              id="lineThickness"
              onChange={handleInutChange}
            />
          </div>
        </div>
        <button className={style.submit} type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddFish;
