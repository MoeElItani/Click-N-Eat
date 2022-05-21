import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import axios from 'axios'
import { reset } from '../redux/cartSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OrderDetails from '../components/OrderDetails'


const Cart = () => {
  // get Cart data from the Redux store state (Redux)
  const cart = useSelector((state) => state.cart);
  // Cash out States to open order details modal
  const [ cashOut, setCashOut ] = useState(false);
  const [ exitCashOut, setExitCashOut ] = useState(false);
  // Trigger changes to Store (Redux)
  const dispatch = useDispatch();
  // Get the router object (Redux)
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      // Sending Order to Database
      const res = await axios.post(`/api/Orders`, data)
      if (res.status === 201 && router) {
        dispatch(reset());
        router.push(`/Orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.cart}>
        <h1 className={styles.pageTitle}>Cart</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Food Item</th>
                <th>Name</th>
                <th>Combo</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </tbody>
            <tbody>
              {cart.items.map(item => (
                <tr className={styles.tr} key={item._id}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={item.img}
                        loading='lazy'
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{item.title}</span>
                  </td>
                  <td>
                    <span className={styles.combo}>{item.combo == 0 ? 'No' : 'Yes'}</span>
                  </td>
                  <td>
                    <span className={styles.price}>${(Math.round((item.price) * 100) / 100).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{item.quantity}</span>
                  </td>
                  <td>
                    {/* round price & decimal point:2 */}
                    <span className={styles.total}>${(Math.round((item.price * item.quantity) * 100) / 100).toFixed(2)}</span>
                  </td>
                </tr>
              ))}
              {cashOut && (
                <OrderDetails total={cart.total} createOrder={createOrder} />
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Receipt</h2>
            <div className={styles.totalText}>
              {/* round price & decimal point:2 */}
              <b className={styles.text}>Total:</b>${(Math.round((cart.total) * 100) / 100).toFixed(2)}
            </div>
            <div className={styles.totalText}>
              <b className={styles.text}>Pay Cash on Delivery</b>
            </div>
            <Link href='../#menu' passHref><button className={styles.button}>Go Back to Menu </button></Link>

            <div>
              <button onClick={() => { setCashOut(true), setExitCashOut(true) }} className={styles.button}>Proceed to Checkout</button>
            </div>
          </div>

          {exitCashOut && (

            <svg
              className={styles.exit}
              onClick={() => { setCashOut(false), setExitCashOut(false) }}
              width='35'
              height='35'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;


