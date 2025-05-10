import React, { createContext, useState, useEffect } from "react";
import Hosts from "../../config";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const host = Hosts.host;
  const imagePath = `${host}/uploads`;

  // State for orders
  const [orders, setOrders] = useState([]);
  const [planorders, setPlanorders] = useState([]);

  // Fetch orders and plan orders
  useEffect(() => {
    axios
      .get(`${host}/api/order/getorders`)
      .then((res) => setOrders(res?.data?.orders || []))
      .catch((err) => console.error("Error fetching orders:", err.message));

    axios
      .get(`${host}/api/order/getplanorders`)
      .then((res) => setPlanorders(res?.data?.planorders || []))
      .catch((err) =>
        console.error("Error fetching plan orders:", err.message)
      );
  }, []); // Runs once after initial render

  // State for feedback
  const [feedback, setFeedback] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Fetch feedback
  useEffect(() => {
    axios
      .get(`${host}/api/feedback/getfeedback`)
      .then((res) => {
        if (res.data.success) {
          setFeedback(res?.data?.feedbacks || []);
        }
      })
      .catch((err) => console.error("Error fetching feedback:", err.message));
  }, [feedbackCount]); // Runs when feedbackCount changes

  // State for notifications
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [replyNotificationsCount, setReplyNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications
  useEffect(() => {
    axios
      .get(`${host}/api/notifications`)
      .then((response) => {
        const fetchedNotifications = response.data;
        setNotifications(fetchedNotifications);
        setLoading(false);
        const count = fetchedNotifications.filter(
          (notification) => notification.reply
        ).length;
        setReplyNotificationsCount(count);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [notificationsCount]); // Runs when notificationsCount changes

  // State for members, plans, classes, and products
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [classes, setClasses] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch members and plans
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${host}/api/members`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${host}/api/plans/getPlans`);
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchMembers();
    fetchPlans();
  }, []); // Runs once after initial render

  // Fetch classes and products
  useEffect(() => {
    axios
      .get(`${host}/api/class/getClasses`)
      .then((response) => setClasses(response.data))
      .catch((error) => console.log("Error fetching classes:", error));

    axios
      .get(`${host}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Runs once after initial render

  return (
    <AuthContext.Provider
      value={{
        host,
        imagePath,
        orders,
        planorders,
        feedback,
        setFeedbackCount,
        notifications,
        setNotificationsCount,
        replyNotificationsCount,
        loading,
        error,
        setError,
        members,
        plans,
        classes,
        products,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
