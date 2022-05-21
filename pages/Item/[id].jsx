import React from 'react'
import styles from '../../styles/Item.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = ({ foodItem }) => {
  // State to Update Price (Combo/No Combo)
  const [ price, setPrice ] = useState(foodItem.prices[ 0 ]);
  // State to Update Combo Image (On/Off)
  const [ combo, setCombo ] = useState(0);
  // State to Store Food Item Quantity
  const [ quantity, setQuantity ] = useState(1);
  // Trigger changes to Store (Redux)
  const dispatch = useDispatch();

  // Function to update Price (Combo/No Combo)
  const changePrice = (number) => {
    setPrice(price + number)
  }

  // Function to Calculate price difference and Update Combo Image (Combo/ No Combo)
  const handleCombo = (comboIndex) => {
    const difference = foodItem.prices[ comboIndex ] - foodItem.prices[ combo ];
    setCombo(comboIndex);
    changePrice(difference);
  }

  const handleClick = () => {
    // Send Food Item and details to cart using React Redux
    dispatch(addItem({ ...foodItem, combo, price, quantity }));
    toast.success('Added to Cart!', {
      position: "bottom-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };


  return (
    <div className={styles.container}>
      <Link href="../#menu" passHref>
        <svg
          className={styles.back}
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="44" height="44"><path d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z" />
        </svg>
      </Link>
      <div className={styles.left}>
        {/* Food Item Image */}
        <div className={styles.imgContainer}>
          <Image src={foodItem.img} width={420} height={420} alt={foodItem.title} />
        </div>
      </div>
      <div className={styles.right}>
        {/* Food Item Info */}
        <h1 className={styles.name}>{foodItem.title}</h1>
        <p className={styles.desc}>{foodItem.description}</p>
        <span className={styles.price}>${foodItem.prices[ combo ]}</span>
        <span className={styles.addCombo}>Add Combo? (+ $3)</span>
        {/* Toggle Between Combo and No Combo */}
        <div className={styles.combo} onClick={() => combo == 0 ? handleCombo(1) : handleCombo(0)}>
          <Image loading='lazy' src={combo == 0 ? '/img/OtherIcons/combo.png' : '/img/OtherIcons/comboOn.png'} width={43} height={43} alt='combo button' />
          <span className={styles.comboDescription}>Fries +  Soft Drink</span>
        </div>
        {/* Item Quantity Input with minimum 1 and maximum 999  */}
        <div className={styles.add}>
          <input className={styles.quantity} type="number"
            defaultValue={1}
            min={1}
            max={999}
            maxLength={3}
            onChange={(e) => { setQuantity(e.target.value) }}
          />
          <button className={styles.submit} onClick={handleClick}>Add to Cart</button>
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

// Getting Specific Item (By ID) from API
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/Items/${params.id}`);
  return {
    props: {
      foodItem: res.data
    }
  };
};


export default Item;