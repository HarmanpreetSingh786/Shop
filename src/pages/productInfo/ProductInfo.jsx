import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, collection, where, getDocs, query, limit } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import RelatedProducts from "../../pages/relatedProduct/RelatedProduct"

const ProductInfo = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const [userRating, setUserRating] = useState(0); // State for user rating
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();

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

  // Inside your component function
const navigateToRelatedProduct = (productId) => {
  window.location.href = `/productinfo/${productId}`;
};


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
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800" style={{ color: mode === "dark" ? "white" : "" }}>
        {loading ? (
          <div className="flex justify-center items-center" style={{ color: mode === "dark" ? "white" : "" }}>
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="">
                  <div className="">
                    <img className="w-64 ml-auto mr-auto lg:h-[30em] object-contain" src={product?.productImageUrl} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6">
                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300" style={{ color: mode === "dark" ? "white" : "" }}>
                      {product?.title}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">{renderStars()}</div>
                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400" style={{ color: mode === "dark" ? "white" : "" }}>
                      <span>₹ {product?.price}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400" style={{ color: mode === "dark" ? "white" : "" }}>
                      Description :
                    </h2>
                    <p>{product?.description}</p>
                  </div>

                  <div className="mb-6" />
                  <div className="flex flex-wrap items-center mb-6">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <button
                        onClick={() => deleteCart(product)}
                        className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600  hover:bg-red-600 hover:text-gray-100  rounded-xl"
                      >
                        Delete from cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600  hover:bg-pink-600 hover:text-gray-100  rounded-xl"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                  {/* <div className="flex gap-4 mb-6">
                    <button className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl">Buy now</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
        <RelatedProducts />

        {/* <div className="py-8">
        <h1 className="font-bold text-2xl text-center mb-4">Related Products</h1>
        {!loading && relatedProducts.length > 0 && (
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4  justify-center">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-gray-500 shadow-[inset_0_0_2px_rgba(0,0,0,0.9)]cursor-pointer">
                  <img 
                  onClick={() => navigateToRelatedProduct(relatedProduct.id)}
                  className="lg:h-52 p-3 pt-2 h-96 rounded-2xl w-full hover:scale-110 transition-scale-110  duration-300 ease-in-out object-contain" src={relatedProduct.productImageUrl} alt={relatedProduct.title} />
                  <div className="p-4">
                    <h2 className="title-font text-lg font-medium text-gray-900 mb-3">{relatedProduct.title.substring(0, 21)}...</h2>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          ShopEaze
                        </h2>
                      <span className="title-font text-lg font-medium text-gray-900 mb-3">₹ {relatedProduct.price}</span>
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
        </div> */}
        
      </section>
    </Layout>
  );
};

export default ProductInfo;
