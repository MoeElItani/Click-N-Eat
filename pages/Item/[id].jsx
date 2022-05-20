import React from 'react'
import styles from '../../styles/Item.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import Link from 'next/link'
import { ArrowCircleLeftIcon } from '@heroicons/react/outline'
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
      <Link href="../#menu" passHref><ArrowCircleLeftIcon className={styles.back} height='40px' width='40px' />
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