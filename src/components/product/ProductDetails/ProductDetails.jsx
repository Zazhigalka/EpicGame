import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useProduct } from "../../../contexts/ProductContextProvider";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { useAuth } from "../../../contexts/AuthContextProvider";

const ProductDetails = () => {
  const {
    oneProduct,
    getOneProduct,
    addReview,
    deleteReview,
    saveEditedReview,
  } = useProduct();
  const { currentUser } = useAuth();

  const [text, setText] = useState();
  const [commentToEdit, setCommentToEdit] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id);
  }, []);

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = { text, product: id };
    getOneProduct(id);
    addReview(newReview);
    setText("");
  };

  const handleChange = (e) => {
    setCommentToEdit({ ...commentToEdit, text: e.target.value });
  };

  const handleSave = () => {
    const editedReview = {
      text: commentToEdit.text,
      product: commentToEdit.product,
    };
    saveEditedReview(editedReview, commentToEdit.id);
    setCommentToEdit(null);
  };

  return (
    <div>
      <img width={"500px"} src={oneProduct?.image} alt="" />
      <h3>{oneProduct?.title}</h3>
      <p>{oneProduct?.price}</p>
      <p>{oneProduct?.description}</p>
      <p>{oneProduct?.category.title}</p>
      <form onSubmit={handleAddReview}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-75"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>add review</button>
      </form>
      <div>
        {oneProduct?.reviews.map((item) => (
          <div key={item.id} className="border m-4">
            <h5>{item.author}</h5>
            {commentToEdit && commentToEdit.id === item.id ? (
              <>
                <input onChange={handleChange} value={commentToEdit.text} />
                <button onClick={() => setCommentToEdit(null)}>cancel</button>
                <button onClick={handleSave}>save review</button>
              </>
            ) : (
              <p style={{ fontFamily: "sans-serif", fontSize: "18px" }}>
                {item.text} {"  "}
                <span style={{ fontSize: "12px", color: "gray" }}>
                  {moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </p>
            )}

            {item.author === currentUser ? (
              <div>
                <button onClick={() => setCommentToEdit(item)}>edit</button>
                <button onClick={() => deleteReview(item.id, id)}>
                  delete
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <Button variant={oneProduct?.favorite_by_user ? "success" : "secondary"}>
        {oneProduct?.favorite_by_user
          ? "Remove from favorites"
          : "Add to favorites"}
      </Button>
    </div>
  );
};

export default ProductDetails;
