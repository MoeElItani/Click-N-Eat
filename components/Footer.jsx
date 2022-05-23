import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <span className={styles.title}>Click N&apos; Eat</span>
          <span className={styles.slogan}> Your Food Is Just A Few Clicks Away</span>
          <p className={styles.about}>is an online restaurant that&apos;ll provide you with delicious food right at your doorstep at affordable prices.</p>
        </div>
        <hr className={styles.break} />
        <div className={styles.section}>
          <div className={styles.social}>
            <h1 className={styles.socialHeader}>Find Us on Social Media:</h1>
            <a target='_blank' href="https://www.facebook.com" rel="noopener noreferrer"><Image loading='lazy' src='/img/Social/Fb.png' height={48} width={48} alt='Facebook icon' /></a>
            <a target='_blank' href="https://www.instagram.com" rel="noopener noreferrer"><Image loading='lazy' src='/img/Social/Insta.png' height={48} width={48} alt='Instagram icon' /></a>
            <a target='_blank' href="https://www.tiktok.com" rel="noopener noreferrer"><Image loading='lazy' src='/img/Social/Tiktok.png' height={48} width={48} alt='Tiktok icon' /></a>
            <a target='_blank' href="https://www.twitter.com" rel="noopener noreferrer"><Image loading='lazy' src='/img/Social/Twitter.png' height={48} width={48} alt='Twitter icon' /></a>
          </div>
          <span className={styles.copyrights}>&copy;2020-2022 Click N&apos; Eat | All Rights Reserved</span>
        </div>
      </div>
    </div>
  )
}

export default Footer;