import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const context = useContext(myContext);
  const {
    mode,
    toggleMode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterPrice,
    setFilterType,
    filterPrice,
  } = context;
  const { loading, getAllProduct } = context || {};

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    const serializedItem = {
        ...item,
        time: item.time.toDate().getTime() // Assuming _Timestamp is a Firestore Timestamp
    };
    dispatch(addToCart(serializedItem));
    toast.success("Added to cart");
};


const deleteCart = (item) => {
  // Exclude non-serializable values from the item object before dispatching the action
  const { id, ...rest } = item;
  const serializableItem = { id };
  dispatch(deleteFromCart(serializableItem));
  toast.success("Removed from cart");
};


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
    <div className="mt-10" style={{ color: mode === "dark" ? "white" : "" }}>
      {/* Heading */}
      <div className="">
        <h1 className="text-center mb-5 text-2xl font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* Main Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>

          {/* Product Cards */}
          <div className="flex flex-wrap -m-4">
            {getAllProduct
              .slice(0, 12)
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => {
                if (!filterPrice || filterPrice === "all") {
                  return true;
                } else if (filterPrice === "1000-5000") {
                  return (
                    parseFloat(obj.price) > 1000 &&
                    parseFloat(obj.price) <= 5000
                  );
                } else if (filterPrice === "5000-10000") {
                  return (
                    parseFloat(obj.price) > 5000 &&
                    parseFloat(obj.price) <= 10000
                  );
                } else if (filterPrice === "10000-15000") {
                  return (
                    parseFloat(obj.price) > 10000 &&
                    parseFloat(obj.price) <= 15000
                  );
                } else if (filterPrice === "15000-20000") {
                  return (
                    parseFloat(obj.price) > 15000 &&
                    parseFloat(obj.price) <= 20000
                  );
                } else if (filterPrice === "above-20000") {
                  return parseFloat(obj.price) > 20000;
                } else {
                  const [min, max] = filterPrice.split("-").map(Number);
                  return (
                    parseFloat(obj.price) >= min && parseFloat(obj.price) <= max
                  );
                }
              })
              .map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div key={index} className="p-4 w-full md:w-1/4 hover:shadow">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-gray-500 shadow-[inset_0_0_2px_rgba(0,0,0,0.9)]cursor-pointer">
                      <img
                        onClick={() => navigate(`productinfo/${id}`)}
                        className="lg:h-52 p-3 pt-2 h-96 rounded-2xl w-full hover:scale-110 transition-scale-110  duration-300 ease-in-out object-contain"
                        src={productImageUrl}
                        alt="image"
                      />
                      <div className="p-6" >
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          ShopEaze
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title.substring(0, 21)}...
                        </h1>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </h1>

                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Remove From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default HomePageProductCard;
