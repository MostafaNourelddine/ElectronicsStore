import { useState } from "react";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/CartSlice";

const Item = (props) => {
  const [quickView, setQuickView] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [showGuestAlert, setShowGuestAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!user || user.role === "guest") {
      setShowGuestAlert(true);
      setTimeout(() => setShowGuestAlert(false), 2000);
      return;
    }
    dispatch(
      addToCart({
        id: props.product.id,
        name: props.name,
        price: props.price,
        image: props.image,
      })
    );

    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 2000);
  };

  return (
    <>
      <div className="border m-4 p-4 rounded-md w-[350px] transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl group">
        <div
          className="relative bg-[#04369a] rounded-lg w-full h-[250px] overflow-hidden cursor-pointer"
          onClick={() => setQuickView(true)}
        >
          <img
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            src={props.image}
            alt={props.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-white text-lg font-bold px-4 py-2 rounded-lg">
              Quick View
            </span>
          </div>
        </div>

        <div className="mt-4 mx-4">
          <div className="text-gray-500 font-semibold">{props.category}</div>
          <div className="truncate max-w-full">{props.description}</div>
          <div className="flex flex-col mt-6 items-start">
            <div className="flex justify-between w-full items-center">
              <div className="text-lg font-bold">${props.price}</div>
              <Button
                label="Add"
                icon="pi pi-shopping-cart"
                className="rounded-lg hover:rounded-3xl text-white px-4 py-2 bg-gradient-to-r from-[#04369b] to-[#2f77be] border-none shadow-md transition-all duration-300"
                onClick={handleClick}
              />
            </div>

            {showGuestAlert && (
              <div className="mt-2 bg-red-500 text-white px-3 py-1 rounded shadow-md animate-fadeInOut">
                Guests cannot perform this action!
              </div>
            )}
            {showSuccessAlert && (
              <div className="mt-2 bg-green-500 text-white px-3 py-1 rounded shadow-md animate-fadeInOut">
                Added to cart successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {quickView && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-fadeIn">
            <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
              {props.name}
            </h2>

            <div className="w-full h-64 mb-4 overflow-hidden rounded-2xl">
              <img
                src={props.image}
                alt={props.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-2xl font-bold text-center text-[#04369b] mb-4">
              ${props.price}
            </div>

            <p className="text-gray-700 mb-6 text-center">
              {props.description}
            </p>

            <div className="flex justify-center">
              <Button
                label="Close"
                icon="pi pi-times"
                className="px-8 py-3 bg-gradient-to-r from-[#04369b] to-[#2f77be] text-white rounded-full shadow-lg"
                onClick={() => setQuickView(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
