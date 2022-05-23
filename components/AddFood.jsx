import React, { useState } from 'react'
import styles from '../styles/AddFood.module.css'
import axios from 'axios'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const port = process.env.PORT || 3000;

const AddFood = () => {
  // States to get input from Admin
  const [ img, setImg ] = useState(null);
  const [ title, setTitle ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ prices, setPrices ] = useState([]);

  // Filling the prices array
  const Prices = (e, index) => {
    const currPrices = prices;
    currPrices[ index ] = e.target.value;
    setPrices(currPrices);
  };

  const handleClick = async () => {
    // Uploading Food Item's Image to my Cloudinary API 
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'FoodItems')
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/mohammaditani/image/upload',
        data
      );
      const { url } = uploadRes.data;
      const newItem = {
        img: url,
        title,
        description,
        prices
      }

      toast.success('Food Item Added to Menu!', {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      // Posting New Food Item to the Database
      await axios.post(`/api/Items`, newItem);
      Router.reload();

    } catch (err) {
      toast.warn('Failed to Add Item Added to Menu!', {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      console.log(err);
    }

  }


  return (

    <div className={styles.bg}>
      <div className={styles.container} >
        <div className={styles.wrapper}>
          <p className={styles.title} >Add New Food Item</p>
          <div className={styles.item}>
            <input className={styles.fileInput}
              name='image'
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => setImg(e.target.files[ 0 ])}
            // Can choose only 1 img file
            />
          </div>
          <div className={styles.item}>
            <input className={styles.inputs}
              name='title'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <textarea className={styles.inputs}
              name='description'
              rows='4'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <input className={`${styles.inputs} ${styles.prices}`}
              type='number'
              name='prices'
              placeholder='Price [No Combo]'
              onChange={(e) => Prices(e, 0)}
            />
            <input className={`${styles.inputs} ${styles.prices}`}
              type='number'
              name='prices'
              placeholder='Price [Combo]'
              onChange={(e) => Prices(e, 1)}
            />
          </div>
          <button className={styles.btn} onClick={handleClick}>Add To Menu</button>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default AddFood