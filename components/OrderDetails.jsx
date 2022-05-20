import React, { useState } from 'react'
import styles from '../styles/OrderDetails.module.css'
import { useSelector } from 'react-redux'

const OrderDetails = ({ total, createOrder }) => {

  // States to Store Order Details
  const [ customer, setCustomer ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ address, setAddress ] = useState('')
  // get Cart data from the Redux store state
  const cart = useSelector((state) => state.cart);

  // Posting Order to Database
  const handleClick = (data) => {
    createOrder({ customer, phone, address, total, method: 0, cart });
  };

  return (

    <div className={styles.bg}>
      <div className={styles.container} >
        <div className={styles.wrapper}>
          <p className={styles.title} >Enter Order Details</p>
          <div className={styles.item}>
            <input className={styles.inputs}
              name='fullname' type="text"
              placeholder='Name'
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <input className={styles.inputs}
              name='phone' type="tel"
              placeholder='Phone Number'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <textarea className={styles.inputs}
              name='address'
              rows='4'
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className={styles.btn} onClick={handleClick}>Confirm Order</button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails