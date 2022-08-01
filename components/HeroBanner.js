import Image from "next/image";
import styles from "../styles/HeroBanner.module.css";

const HeroBanner = ({ heroBannerImage }) => {
  return (
    <div className={styles.heroBannerContainer}>
      <Image src={heroBannerImage.url} alt="" layout="fill" />
      <div className={styles.heroBannerTitle}>
        <h1>Lorem Ipsum</h1>
        <h2>
          Dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor
          incididun.
        </h2>
      </div>
    </div>
  );
};

export default HeroBanner;
