import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useProduct } from "../../../contexts/ProductContextProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const {
    categories,
    getCategories,
    updateProduct,
    oneProduct,
    getOneProduct,
  } = useProduct();

  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id);
    getCategories();
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category.id);
    }
  }, [oneProduct]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    if (!title || !description || !price || !category) {
      alert("ЗАПОЛНИТЕ ПОЛЯ!!!");
      return;
    }

    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("price", price);
    newProduct.append("description", description);
    newProduct.append("category", category);

    if (image) {
      newProduct.append("image", image);
    }
    updateProduct(id, newProduct);
  };

  return (
    <div className="w-50 mt-5 m-auto">
      <h2>EDIT PRODUCT</h2>
      <Form.Control
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
        value={title}
      />
      <Form.Control
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        type="text"
        value={description}
      />
      <Form.Control
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="text"
        value={price}
      />
      <Form.Select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
        value={category}
      >
        <option>Choose category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <p>IMAGE BEFORE : {oneProduct ? oneProduct.image : "image is empty"}</p>
      <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" />

      <Button className="mt-3" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditProduct;
