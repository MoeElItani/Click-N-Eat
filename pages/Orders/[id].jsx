import React from 'react'
import styles from '../../styles/Orders.module.css'
import axios from 'axios'
import Image from 'next/image'


const Orders = ({ orders }) => {
  // Order Delivery Status
  const status = orders.status;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.head}>We Received Your Order!</h1>
        <p className={styles.sub}>Sit tight as we prepare your order and send it right away...</p>
        <div className={styles.row}>
          <table className={styles.table}>
            <div className={styles.row}>
              <div className={styles.status}>
                <h3 className={styles.orderStatus}>Order Status: <span
                  className={styles.statusText}>
                  {status == 0 ? 'Preparing...' : 'Delivered!'}</span>
                </h3>
              </div>
            </div>

            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Item</th>
              <th>Combo</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>

            {/* Looping Through Cart Items */}
            {orders.cart[ 0 ][ 0 ].items.map(item => (
              <tr key={item._id}>
                <td>
                  <div className={styles.ordersItems}>
                    <Image
                      src={item.img}
                      loading='lazy'
                      width='60px'
                      height='60px'
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.ordersItems}>{item.title}</span>
                </td>
                <td>
                  <span className={styles.ordersItem}>{item.combo == 0 ? 'No' : 'Yes'}</span>
                </td>
                <td>
                  <span className={styles.ordersItem}>{item.quantity}</span>
                </td>
                <td>
                  {/* round total price & decimal point:2 */}
                  <span>${(Math.round((item.price * item.quantity) * 100) / 100).toFixed(2)}</span>
                </td>
              </tr>
            ))}


            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Total</th>
            </tr>

            <tr className={styles.tr}>
              <td>
                <span className={styles.oID}>{orders._id}</span>
              </td>
              <td>
                <span className={styles.customerName}>{orders.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{orders.address}</span>
              </td>
              <td>
                <span className={styles.phone}>{orders.phone}</span>
              </td>
              <td>
                {/* round price & decimal point:2 */}
                <span className={styles.total}>${(Math.round((orders.total) * 100) / 100).toFixed(2)}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Receipt</h2>
          <div className={styles.totalText}>
            {/* round price & decimal point:2 */}
            <b className={styles.text}>Total:</b>${(Math.round((orders.total) * 100) / 100).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.text}>Pay Cash on Delivery</b>
          </div>
        </div>
      </div>
    </div>
  );
};

// Getting Orders by ID from API
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`/api/Orders/${params.id}`);
  return {
    props: { orders: res.data },
  };
};

export default Orders;