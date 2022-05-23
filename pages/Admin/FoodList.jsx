import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import styles from "../../styles/Admin.module.css"
import Link from 'next/link'
import AddFood from '../../components/AddFood'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.APP_URL;

// States to Toggle a window to Add New Food Item
const FoodList = ({ Items }) => {
  const [ foodList, setFoodList ] = useState(Items);
  const [ newItem, setNewItem ] = useState(false);
  const [ exit, setExit ] = useState(false);

  // Deleting Food Item By ID on Button Click
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `/api/Items/` + id
      )
      //  State to check id of deleted food item and Filter them out
      toast.warn('Food Item Deleted from Menu!', {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setFoodList(foodList.filter(food => food._id !== id))
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        <div>
          <Link href={'./OrdersList'} passHref><span className={styles.links}>Orders List</span></Link>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Food Item
            <svg
              className={styles.plus}
              onClick={() => { setNewItem(true), setExit(true) }}
              width='30'
              height='30'
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" />
            </svg>
          </h1>
          {/* Button Click changes newItem's State to True and opens a Modal to Add New Food */}
          {newItem && <AddFood />}
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th className={styles.ID}>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </tbody>
            {/* Looping through Food Items in the database */}
            {foodList.map((items) => (
              <tbody key={items._id}>
                <tr className={styles.trTitle}>
                  <td>
                    <Image
                      src={items.img}
                      loading='lazy'
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td className={styles.ID}>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={`../Item/${items._id}`}>
                      {items._id}
                    </a>
                  </td>
                  <td>{items.title}</td>
                  <td>${items.prices[ 0 ]}</td>
                  <td>
                    <button className={styles.button}
                      onClick={() => handleDelete(items._id)}>
                      <svg
                        className={styles.delete}
                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z" />
                      </svg>
                    </button>
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
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {/* Exit button to change newItem's State to false and close the "Add new Item" modal */}
        {exit && (


          <svg
            className={styles.exit}
            onClick={() => { setNewItem(false), setExit(false) }}
            width='35'
            height='35'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
          </svg>

        )}
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

  return {
    props: {
      Items: foodRes.data,
    },
  };
};

export default FoodList;