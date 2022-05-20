import React, { useState } from 'react'
import styles from '../../styles/Login.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'


const Login = () => {
  // States to get credentials input
  const [ username, setUsername ] = useState(null);
  const [ password, setPassword ] = useState(null);
  // State to trigger an error if wrong credentials are entered
  const [ error, setError ] = useState(false);
  // Get the router Object
  const router = useRouter();

  const handleClick = async () => {
    // If Successfully Authenticated, admin is redirected to Admin Dashboard
    try {
      await axios.post(`/api/Login`, {
        username,
        password,
      });
      router.push("/Admin");
    } catch (err) {
      // Wrong Credentials Error is Triggered
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Login</h1>
        <input
          placeholder="username"
          className={styles.inputs}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.inputs}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.btn}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};
export default Login