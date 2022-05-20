import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import styles from "../../styles/Admin.module.css"
import Link from 'next/link'


const OrdersList = ({ Orders }) => {

  // Delivery Status Array
  const status = [ "preparing", "delivered" ];
  // State to Get Orders List
  const [ ordersList, setOrdersList ] = useState(Orders);


  const handleStatus = async (id) => {
    const order = ordersList.filter((orders) => orders._id === id)[ 0 ];
    // toggle status between preparing/delivered
    { order.status == 0 ? order.status = 1 : order.status = 0 }
    try {
      const res = await axios.put(`/api/Orders/${id}` , {
        status: order.status
      });
      setOrdersList(
        [
          //update and return orders of status= delivered
          res.data,
          //return all orders of status= preparing
          ...ordersList.filter(orders => orders._id !== id)
        ]
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <Link href={'./FoodList'} passHref><span className={styles.links}>Food List</span></Link>
        </div>
        <div className={styles.item}>
          <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                  <th className={styles.ID}>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Delivered</th>
                </tr>
              </tbody>
              {ordersList.map((orders) => (
                <tbody key={orders._id}>
                  <tr className={styles.trTitles}>
                    <td className={styles.ID}>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href={`../Orders/${orders._id}`}>
                        {orders._id}
                      </a>
                    </td>
                    <td>{orders.customer}</td>
                    <td>${(Math.round((orders.total) * 100) / 100).toFixed(2)}</td>
                    <td>{status[ orders.status ]}</td>
                    <td>
                      <button className={styles.button} onClick={() => handleStatus(orders._id)}>
                        <Image loading='lazy' src='/img/Status/delivered.png' width={42} height={24} alt='Change Status Button' />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Making Sure Admin is Authorized to Access This Page, if not, he will get redirected to login as an admin
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/Admin/Login",
        permanent: false,
      },
    };
  }

  const orderRes = await axios.get(`/api/Orders`);

  return {
    props: {
      Orders: orderRes.data
    },
  };
};

export default OrdersList;