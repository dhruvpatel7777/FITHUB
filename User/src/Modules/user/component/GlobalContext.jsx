
import React, { createContext, useState, useEffect } from 'react';
import Hosts from '../../../config';
import axios from 'axios'
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const host = Hosts.host;
    const imagePath = `${host}/uploads`;
    //  // User
  const [userDetails, setUserDetails] = useState({});


     useEffect(() => {
  const token = localStorage.getItem("auth-token");
        if (token) {
          axios
            .get(`${host}/api/users/getuser`, {
              headers: { "auth-token": token },
            })
            .then((res) => {
              setUserDetails(res.data.user); // Ensure you're accessing the user object correctly
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [ host]);
      
     const [carts, setCarts] = useState([]);
     const [cartCount, setCartCount] = useState(0);
     useEffect(() => {
         const token =(localStorage.getItem('auth-token')); // or wherever you're storing the token
         axios.get(`${host}/api/cart/getCartById`, {
             headers: {
                 'auth-token': token
             }
         })
             .then((res) => {
                 setCarts(res?.data?.carts);
             })
             .catch((err) => {
                 console.log(err);
             });
     }, [cartCount]);
     


     const [feedback,setFeedback]=useState([])
    const [feedbackCount,setFeedbackCount]=useState(0)
    useEffect(() => {
        axios.get(`${host}/api/feedback/getfeedback`)
            .then((res) => {
                if(res.data.success){
                    // Set state with the fetched data
                    setFeedback(res?.data?.feedbacks);
                }
            })
            .catch((err) => {
                // Handle errors here
                console.error('Error fetching requests:', err.message);
            });
    }, [feedbackCount]); // Empty dependency array ensures this runs only once after initial render

    const [notificationsCount, setNotificationsCount] = useState(0)
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch existing notifications from the API
    axios.get(`${host}/api/notifications`)
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [notificationsCount]);
  
    return (
        <AuthContext.Provider value={{
            host, imagePath,userDetails,carts,setCartCount,
            feedback,setFeedbackCount,notifications,setNotificationsCount,
            loading,error
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };
