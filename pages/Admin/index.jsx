import React from 'react';
import styles from "../../styles/Admin.module.css";
import Link from 'next/link';
import axios from "axios";


const Index = () => {

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>

        <h1 className={styles.title}>Welcome to Admin Dashboard</h1>
        <br />
        <div className={styles.links}>
          <Link href={'../Admin/FoodList'}>Food List</Link>
        </div>
        <div className={styles.links}>
          <Link href={'../Admin/OrdersList'}>Orders List</Link>
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

  const foodRes = await axios.get(`/api/Items`);
  const orderRes = await axios.get(`/api/Orders`);

  return {
    props: {
      Items: foodRes.data,
      Orders: orderRes.data
    },
  };
};

export default Index;