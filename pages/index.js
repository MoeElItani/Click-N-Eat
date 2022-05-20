import Head from "next/head";
import Slider from '../components/Slider';
import FoodItems from '../components/FoodItems';
import styles from "../styles/Home.module.css";
import axios from 'axios';

axios.defaults.baseURL = process.env.APP_URL

export default function Home({ ItemList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Click N&apos; Eat</title>
        <meta name="description" content="Your Food is Just A Few Clicks Away" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Slider />
      <FoodItems ItemList={ItemList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`/api/Items`);
  return {
    props: {
      ItemList: res.data
    }
  }
}