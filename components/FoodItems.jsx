import React from 'react'
import styles from '../styles/FoodItems.module.css'
import FoodCard from './FoodCard'

const FoodItems = ({ItemList}) => {
  return (
    <div className={styles.container}>
      <h1 id='menu' className={styles.slogan}>Your Food Is Just A Few Clicks Away...</h1>
      <div className={styles.wrapper}>
        {ItemList.map(Item => (
          <FoodCard key={Item._id} Item={Item}/>
        ))}
      </div>
    </div>
  )
}

export default FoodItems