import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../slices/CartSlice";

const Cart = ({ setCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 flex justify-end">
      <div className="text-black bg-white shadow-2xl h-screen w-96 relative p-6 animate-slideIn rounded-l-2xl">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold">
            Shopping Cart ({cartItems.length})
          </h2>
          <button
            onClick={() => setCart(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 font-bold hover:text-red-700 transition"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t p-6 bg-white rounded-bl-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-[#04369a]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-[#04369a] text-white py-3 rounded-xl hover:bg-[#062e7f] transition font-semibold shadow-md">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
