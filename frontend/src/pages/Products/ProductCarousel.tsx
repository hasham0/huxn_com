import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetTopProductsQuery } from "../../redux/api/productApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { ProductTS } from "../../types";

type Props = {};

export default function ProductCarousel({}: Props) {
  const { data: products, isLoading, isError } = useGetTopProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error while ....</div>;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="mb-4 md:block lg:block xl:block">
        {isLoading ? null : isError ? (
          <Message variant="error">{isError}</Message>
        ) : (
          <Slider
            {...settings}
            className="sm:block sm:w-[40rem] md:w-[56rem] lg:w-[50rem] xl:w-[50rem]"
          >
            {products?.data?.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                stock,
              }: ProductTS) => (
                <div key={_id}>
                  <img
                    src={image}
                    alt={name}
                    className="h-[30rem] w-full rounded-lg object-cover"
                  />

                  <div className="mt-4 flex justify-between">
                    <div className="one">
                      <h2>{name}</h2>
                      <p> $ {price}</p> <br /> <br />
                      <p className="w-[25rem]">
                        {description.substring(0, 170)} ...
                      </p>
                    </div>

                    <div className="flex w-[20rem] justify-between">
                      <div className="one">
                        <h1 className="mb-6 flex items-center">
                          <FaStore className="mr-2 text-white" /> Brand: {brand}
                        </h1>
                        <h1 className="mb-6 flex items-center">
                          <FaClock className="mr-2 text-white" /> Added:{" "}
                          {moment(createdAt).fromNow()}
                        </h1>
                        <h1 className="mb-6 flex items-center">
                          <FaStar className="mr-2 text-white" /> Reviews:
                          {numReviews}
                        </h1>
                      </div>

                      <div className="two">
                        <h1 className="mb-6 flex items-center">
                          <FaStar className="mr-2 text-white" /> Ratings:{" "}
                          {Math.round(rating!)}
                        </h1>
                        <h1 className="mb-6 flex items-center">
                          <FaShoppingCart className="mr-2 text-white" />{" "}
                          Quantity: {quantity}
                        </h1>
                        <h1 className="mb-6 flex items-center">
                          <FaBox className="mr-2 text-white" /> In Stock:{" "}
                          {stock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </Slider>
        )}
      </div>
    </>
  );
}
