import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate("/");
  };

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-back-3e5x.onrender.com/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
        <h3 className="text-2x1">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Delete
        </button>
        <button
          className="p-4 bg-blue-600 text-white m-4 w-full"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
