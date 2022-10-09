import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Todo from "./todoPage/todo";
import { Button } from "../components";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  };

  // this function will call after the dependency change
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div>
      <h4>User Information</h4>
      <h5>userName : {name}</h5>
      <h5>Email : {user?.email}</h5>
      <Todo />
      <Button className="dashboard__btn" onClick={logout} label="Logout" />
    </div>
  );
};
export default Dashboard;
