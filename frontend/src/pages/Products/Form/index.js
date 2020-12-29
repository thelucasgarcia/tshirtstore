import React from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function Form() {
  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [image, setImage] = React.useState();
  const [description, setDescription] = React.useState();

  const formRef = React.useRef();

  const { id } = useParams(); 

  React.useEffect(() => {
    function getProduct() {
      api.get(`/product/${id}`).then(response => {
        fillForm(response.data);
      });
    }
    if (id) { getProduct(); }
  }, [id]);

  function handleSubmitform(e) {
    e.preventDefault();
    id ? edit() : create();
  }

  function fillForm(data) {
    setName(data.name);
    setDescription(data.description)
    setPrice(data.price);
    setImage("");
  }

  function clearFields() {
    setName("")
    setDescription("")
    setPrice("")
    setImage("")
    formRef.current.reset()
  }

  function create() {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    api.post("/product", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        clearFields();
        Swal.fire("Registered Product!", "Your product has been successfully created!", "success");
      })
      .catch(error => Swal.fire("Error!", error.message, "error"));
  }

  function edit() {
    api.put("/product/" + id, { name, price, description })
      .then(({ data }) => {
        Swal.fire("Product Edited!", "Your product has been successfully edited!", "success");
      })
      .catch(error => Swal.fire("Error!", error.message, "error"));
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-3 fw-normal">{id ? 'Edit Product' : 'Create Product'}</h1>
      <br />

      <form onSubmit={e => handleSubmitform(e)} ref={formRef} enctype="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="inputName" name="name" required value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <label htmlFor="inputPrice" className="form-label">Price</label>
          <input type="number" className="form-control" id="inputPrice" name="price" required value={price} onChange={e => setPrice(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="inputDescription" className="form-label">Description</label>
          <textarea className="form-control" id="inputDescription" rows="4" name="description" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        { !id && <div className="mb-3">
          <label htmlFor="inputFile" className="form-label">Image</label>
          <input className="form-control" type="file" id="inputFile" name="image" required={!!!id} onChange={e => setImage(e.target.files[0])} />
        </div>}

        <button type="submit" className="btn btn-primary">Save Product</button>
      </form>
    </div>
  );
}
