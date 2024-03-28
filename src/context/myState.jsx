import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';


function MyState({children}) {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);

    const [getAllProduct, setGetAllProduct] = useState([]);

//Toggle mode 
//  const toggleMode = () => {
//     if (mode === 'light') {
//       setMode('dark');
//       document.body.style.backgroundColor = 'rgb(17, 24, 39)';
//     } else {
//       setMode('light');
//       document.body.style.backgroundColor = 'white';
//     }
//   };
const toggleMode = () => {
    let newMode, newBackgroundColor;
  
    if (mode === 'light') {
      newMode = 'dark';
      newBackgroundColor = 'rgb(17, 24, 39)';
    } else {
      newMode = 'light';
      newBackgroundColor = 'white';
    }
    // Save mode and background color to local storage
    localStorage.setItem('savedMode', newMode);
    localStorage.setItem('savedBackgroundColor', newBackgroundColor);
  
    // Update state and apply styles
    setMode(newMode);
    document.body.style.backgroundColor = newBackgroundColor;
  };
  
// Add this inside your component where you use toggleMode
useEffect(() => {
  // Retrieve mode and background color from local storage
  const savedMode = localStorage.getItem('savedMode');
  const savedBackgroundColor = localStorage.getItem('savedBackgroundColor');

  // Apply the saved values if they exist
  if (savedMode) {
    setMode(savedMode);
  }

  if (savedBackgroundColor) {
    document.body.style.backgroundColor = savedBackgroundColor;
  }
}, []); 

    const getAllProductFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(fireDB, "products"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let productArray = [];
              QuerySnapshot.forEach((doc) => {
                  productArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllProduct(productArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }

  //Order state
  const [getAllOrder, setGetAllOrder] = useState();
  //Get Order Function
  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "order"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let orderArray = [];
            QuerySnapshot.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllOrder(orderArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        // console.log(error);
        setLoading(false);
    }
}

// Delete oder Function
const orderDelete = async (id) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'order', id))
        toast.success('Order Deleted successfully')
        getAllOrderFunction();
        setLoading(false)
    } catch (error) {
        // console.log(error)
        setLoading(false)
    }
}

//User State
const [getAllUser, setGetAllUser] = useState([]);

//Get All User Function
const getAllUserFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "user"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let userArray = [];
            QuerySnapshot.forEach((doc) => {
                userArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllUser(userArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}

useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction()
}, []);

//filter 
const [searchkey, setSearchkey] = useState('')
const [filterType, setFilterType] = useState('')
const [filterPrice, setFilterPrice] = useState('')
const [product, setProduct] = useState([]);
  return (
    <MyContext.Provider value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        orderDelete,
        getAllUser,
        mode,
        toggleMode,
        searchkey,
        setSearchkey,
        filterType,
        setFilterPrice,
        setFilterType,
        filterPrice,
        product,
        setProduct
    }}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState