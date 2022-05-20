import React from 'react'
import styles from '/styles/Navbar.module.css'
import { PhoneIcon } from '@heroicons/react/outline'
import { LocationMarkerIcon } from '@heroicons/react/Solid'
import { ShoppingCartIcon } from '@heroicons/react/Solid'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.info}>
          <div>
            <PhoneIcon className={styles.navIcon} width={20} height={18} />
            <span>71 234-567</span>
          </div>
          <div>
            <LocationMarkerIcon className={styles.navIcon} width={20} height={18} />
            <span>Beirut, Lebanon</span>
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}><Link href='../#menu'>Click N&apos; Eat</Link></li>
        </ul>
      </div>

      <Link href="../Cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <ShoppingCartIcon className={styles.navIcon} width="40px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
