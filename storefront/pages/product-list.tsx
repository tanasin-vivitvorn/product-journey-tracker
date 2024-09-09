import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { fetchProducts } from '../store/slices/productListSlice';
import { AppDispatch, RootState } from '../store';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/productList.module.css';
import ProductListBanner from '@/components/ProductListBanner';

interface Product {
  id: number;
  name: string;
  image: string;
  seller: string;
  location: string;
  category: string;
  price: string;
}

// Sample product data
// const products: Product[] = [
//   {
//     id: 1,
//     name: 'Gold Necklace with Diamonds',
//     image: '/images/cinnamon1.jpg',
//     seller: 'Lux Jewelers',
//     location: 'New York, USA',
//     category: 'Necklaces',
//     price: '$1,200',
//   },
//   {
//     id: 2,
//     name: 'Elegant Sapphire Ring',
//     image: '/images/cinnamon2.jpg',
//     seller: 'Royal Gems',
//     location: 'London, UK',
//     category: 'Rings',
//     price: '$3,500',
//   },
//   {
//     id: 3,
//     name: 'Classic Pearl Earrings',
//     image: '/images/cinnamon3.jpg',
//     seller: 'Pearl Paradise',
//     location: 'Paris, France',
//     category: 'Earrings',
//     price: '$850',
//   },
//   // Add more products as needed
// ];

const ProductList: React.FC = () => {

  const useAppDispatch = () => useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useAppDispatch();
  
  const { products, status, error } = useAppSelector((state: RootState) => state.productList);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className={styles.container}>
      <ProductListBanner />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex space-x-4 ml-auto">
          <button className="btn-outline btn-icon">
            <FontAwesomeIcon icon={faFilter} className="fa-fw"/>
            Filters
          </button>
          <select>
            <option>Recently Listed</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className={`${styles.card} ${styles.cardHover}`}>
            <Image
              src={`/api/public/product/${product.ProductID}/main/0.png`}
              alt={product.ProductName}
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full object-cover"
            />
            <div className="p-4">
              <h3 className={`text-lg font-semibold ${styles.textDarkGray}`}>
                {product.ProductName}
              </h3>
              <p className={styles.textDarkGray}>{product.Supplier.SupplierName}</p>
              <p className={styles.textDarkGray}>{product.location}</p>
              <p className={`${styles.textGold} font-semibold`}>{product.ProductType.ProductTypeName}</p>
              <p className={`${styles.textDarkGray} font-semibold`}>2,000 THB</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;