import React from 'react'
import styles from '../styles/FoodCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const FoodCard = ({ Item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={`Item/${Item._id}`} passHref>
          <Image loading='lazy' src={Item.img} width={420} height={420} alt='Chicken Burger' />
        </Link>
        <h1 className={styles.title}>{Item.title}</h1>
        <span className={styles.info}>{Item.description.substr(0, 80) + '...'}</span>
        <span className={styles.price}>${Item.prices[ 0 ]}</span>
      </div>
    </div>
  )
};

export default FoodCard;