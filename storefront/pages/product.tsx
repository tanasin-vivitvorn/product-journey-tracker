import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Accordion, Timeline, Modal, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchProductDetail } from '../store/slices/productDetailSlice';
import { RootState } from '../store';
import { HiCheckCircle } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const ProductPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    [key: string]: boolean;
  }>({
    concept: false,
    prototype: false,
    launch: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { productId } = router.query;

  const { product, status, error } = useSelector((state: RootState) => state.productDetail);

  useEffect(() => {
    if (productId && typeof productId === 'string') {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  const openModal = (key: string) => {
    setIsModalOpen((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: string) => {
    setIsModalOpen((prev) => ({ ...prev, [key]: false }));
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = product ? (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <Link href="/products">
          <span className="flex items-center text-gray-600 hover:text-gray-800 mb-6 cursor-pointer">
            <FaArrowLeft className="mr-2" /> Back to Products
          </span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-96 relative">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
            >
              {[...Array(3)].map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/api/public/product/${productId}/main/${index}.png`}
                    alt={`${product.product.productName} ${index + 1}`}
                    className="rounded-lg shadow-md w-full h-96 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.product.productName}
            </h1>
            <p className="text-gray-500 mb-2">{product.location}</p>
            <p className="text-2xl text-green-600 font-semibold mb-6">
              200 THB
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
            Ceylon Cinnamon, also known as Cinnamon Zeylanicum is a rare cinnamon variety native to Sri Lanka. It is considered the ultimate and true cinnamon due to its uniquely superior chemical properties over other varieties. Rich in antioxidants, minerals, and flavor, this spice has a wide range of uses including countless health benefits, flavoring, and as an aromatic.
            </p>

            <button className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Technical Details
            </h2>
            <ul className="text-gray-700 space-y-2">
              {Object.keys(product?.predefinedElementsAnswer).map((e:any, index: number) => (
                  <li key={index}>
                    <span className="font-medium">{e}</span> 
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {product?.predefinedElementsAnswer[e]}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Seller Information
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                <span className="font-medium">Name:</span> {product.supplier?.SupplierName}
              </li>
              {product.supplier?.SupplierAttributes.map((e:any, index: number) => (
                  <li key={index}>
                    <span className="font-medium">{e.Name}</span> 
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {e.Value}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Accordion with Timeline */}
        <div className="mt-12">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>Product Development Timeline</Accordion.Title>
              <Accordion.Content>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  <Timeline>
                    {product.predefinedJourneyElements.map((e: any, index: number) => (
                      <Timeline.Item key={`timeline_${index}`}>
                        <Timeline.Point icon={HiCheckCircle} />
                        <Timeline.Content>
                          <Timeline.Time>
                            {e.createAt}
                          </Timeline.Time>
                          <Timeline.Title>
                            {e.ProductJourneyName}
                            </Timeline.Title>
                          <Timeline.Body>
                            {e.messageTemplate}  
                          </Timeline.Body>
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>

        {/* Modals for more details */}
        <Modal
          show={isModalOpen.concept}
          onClose={() => closeModal('concept')}
          size="lg"
        >
          <Modal.Header>Product Conceptualization Details</Modal.Header>
          <Modal.Body>
            <p>
              During the conceptualization phase, we conducted extensive research
              to understand market needs and identify key product features that
              would differentiate us from competitors. Several brainstorming
              sessions were held with cross-functional teams to ensure the
              concept aligned with our overall business strategy.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => closeModal('concept')}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={isModalOpen.prototype}
          onClose={() => closeModal('prototype')}
          size="lg"
        >
          <Modal.Header>Prototype Development Details</Modal.Header>
          <Modal.Body>
            <p>
              The prototype was developed using the latest technology available.
              It included all the features planned for the final product but was
              subject to several rounds of user testing and feedback. We focused
              on usability and functionality to ensure the product would meet user
              expectations.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => closeModal('prototype')}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={isModalOpen.launch}
          onClose={() => closeModal('launch')}
          size="lg"
        >
          <Modal.Header>Final Product Launch Details</Modal.Header>
          <Modal.Body>
            <p>
              The final product launch was accompanied by a comprehensive
              marketing campaign, targeting key customer segments. The launch
              event was held in a prominent venue and featured product
              demonstrations, media coverage, and customer testimonials. Initial
              sales exceeded expectations, and customer feedback was overwhelmingly
              positive.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => closeModal('launch')}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ) : (
      <p>Product not found</p>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return <div>{content}</div>;
};

export default ProductPage;
