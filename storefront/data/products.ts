interface Product {
    id: number;
    name: string;
    location: string;
    image: string;
    technicalDetails: {
      origin: string;
      expirationDate: string;
      type: string;
      subType: string;
    };
    commodityInfo: string;
    seller: {
      name: string;
      location: string;
    };
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Ceylon Cinnamon Powder (C5 Special)',
      location: 'Galle, Sri Lanka',
      image: '/images/cinnamon1.jpg',
      technicalDetails: {
        origin: 'Galle, Sri Lanka, 80000',
        expirationDate: '01/07/2026',
        type: 'Ceylon Cinnamon',
        subType: 'Powder',
      },
      commodityInfo: `
        Ceylon Cinnamon, also known as Cinnamon Zeylanicum is a rare Cinnamon Variety native to Sri Lanka. It is considered as the ultimate and true Cinnamon due to its uniquely superior chemical properties over other varieties. The Ceylon variety has a high reputation and demand in the world. Rich in antioxidants, minerals and flavor, this spice has a wide range of uses including countless health benefits, flavoring and as an aromatic. Its health benefits are vast including regulating insulin, lowering blood pressure, and cholesterol, boosting immunity and digestion and many others.
      `,
      seller: {
        name: 'Perero Works International (pvt) ltd',
        location: 'Dehiwala, Sri Lanka',
      },
    },
  ];
  