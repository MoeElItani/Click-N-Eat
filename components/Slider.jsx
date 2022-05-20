import styles from "../styles/Slider.module.css";
import Image from "next/image";
import { useState } from "react";
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline'
import { ChevronDoubleRightIcon } from '@heroicons/react/outline'

const Slider = () => {

  const [ index, setIndex ] = useState(0);
  const images = [
    "/img/Slider/S1.jpg",
    "/img/Slider/S2.jpg",
    "/img/Slider/S3.jpg"
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2)
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0)
    }
  }

  return (
    <div className={styles.container} id='home'>
      {/* Left Arrow */}
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
        <ChevronDoubleLeftIcon layout="fill" alt="arrow right" />
      </div>
      <h1 className={styles.head}>Hungry?</h1>
      <p className={styles.headText}>Order from <span className={styles.title}>Click N&apos; Eat</span></p>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
        {/* Loading All Images */}
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image loading='lazy' src={img} alt="" layout="fill" />
          </div>
        ))}
      </div>
      {/* Right Arrow */}
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
        <ChevronDoubleRightIcon layout="fill" alt="arrow right" />
      </div>
    </div>
  );
};

export default Slider;
