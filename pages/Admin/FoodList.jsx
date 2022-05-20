import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import styles from "../../styles/Admin.module.css"
import { TrashIcon } from '@heroicons/react/Outline'
import { PlusCircleIcon } from '@heroicons/react/Solid'
import { XCircleIcon } from '@heroicons/react/Solid'
import Link from 'next/link'
import AddFood from '../../components/AddFood'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const port = process.env.PORT || 3000;
const URL = process.env.REACT_APP_API_URL || 'localhost';

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
            <PlusCircleIcon
              className={styles.plus}
              onClick={() => { setNewItem(true), setExit(true) }}
              height={30}
              width={30} />
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
                      <TrashIcon height={20} width={20} />
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
          <XCircleIcon className={styles.exit} width='42px' height='32px' onClick={() => { setNewItem(false), setExit(false) }} />
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