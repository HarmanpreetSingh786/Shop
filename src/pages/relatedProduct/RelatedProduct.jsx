import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, collection, where, getDocs, query, limit } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const [userRating, setUserRating] = useState(0); // State for user rating
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  // Function to fetch product data from Firestore
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });

      // Fetch user's rating from Firestore
      const ratingDoc = await getDoc(doc(fireDB, "ratings", id));
      if (ratingDoc.exists()) {
        setUserRating(ratingDoc.data().rating);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const navigateToRelatedProduct = (productId) => {
    window.location.href = `/productinfo/${productId}`;
  };

  // Function to fetch related products based on category
  const fetchRelatedProducts = async (category) => {
    try {
      const q = query(collection(fireDB, "products"), where("category", "==", category), limit(4));
      const relatedProductsSnapshot = await getDocs(q);
      const relatedProductsData = relatedProductsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Redux state for cart items
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Function to add item to cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  // Effect to store cart items in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Effect to fetch product data and related products when component mounts
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (product && product.category) {
      fetchRelatedProducts(product.category);
    }
  }, [product]);

  // Function to handle user rating change
  const handleRatingChange = async (newRating) => {
    setUserRating(newRating);

    try {
      // Add or update the user's rating in Firestore
      await addDoc(collection(fireDB, "ratings"), {
        productId: id,
        rating: newRating,
        timestamp: serverTimestamp(),
      });

      console.log("Rating stored in Firestore.");
    } catch (error) {
      console.error("Error storing rating in Firestore:", error);
    }
  };

  // Function to render star rating based on user's rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{
            cursor: "pointer",
            color: i <= userRating ? "gold" : "gray", // Filled stars in gold, empty stars in gray
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800" style={{ color: mode === "dark" ? "white" : "" }}>
        <div className="py-8 -m-9">
        <h1 className="font-bold text-2xl text-center mb-4">Related Products</h1>
        {/* Display Related Products */}
        {!loading && relatedProducts.length > 0 && (
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4  justify-center">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="p-4 md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-gray-500 shadow-[inset_0_0_2px_rgba(0,0,0,0.9)]cursor-pointer">
                  <img 
                  onClick={() => navigateToRelatedProduct(relatedProduct.id)}
                  className="lg:h-52 p-3 pt-2 h-60 rounded-2xl w-full lg:hover:scale-110 transition-scale-110  duration-300 ease-in-out object-contain" src={relatedProduct.productImageUrl} alt={relatedProduct.title} />
                  <div className="p-4">
                    <h2 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === "dark" ? "white" : "" }}>{relatedProduct.title.substring(0, 21)}...</h2>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" >
                          ShopEaze
                        </h2>
                      <span className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === "dark" ? "white" : "" }}>₹ {relatedProduct.price}</span>
                        </div>
                      <div className="flex justify-center mb-5  p-3 ">
                          {cartItems.some((p) => p.id === relatedProduct.id) ? (
                            <button
                              onClick={() => deleteCart(relatedProduct)}
                              className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(relatedProduct)}
                              className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Add To Cart
                            </button>
                          )}
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </section>
  );
};

export default ProductInfo;
