import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/productList.module.css';

const ProductListBanner: React.FC = () => {
    return (
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>Buy Commodities</h1>
          <p className={styles.bannerSubtitle}>Connect directly with producers all around the world</p>
        </div>
        <div className={`${styles.bannerSearch} absolute bottom-0 left-0 right-0 transform translate-y-1/2`}>
          <div className={`${styles.searchBox} bg-white shadow-lg rounded-full py-4 px-8 flex justify-between items-center max-w-4xl mx-auto`}>
            <div className={styles.searchField}>
              <label htmlFor="keyword" className={styles.searchLabel}>Keyword</label>
              <input type="text" id="keyword" placeholder="Search for something" />
            </div>
            <div className={styles.searchField}>
              <label htmlFor="region" className={styles.searchLabel}>Region</label>
              <input type="text" id="region" placeholder="Anywhere in the world" />
            </div>
            <button className={styles.btnPrimary}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-fw" /> Search
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ProductListBanner;
