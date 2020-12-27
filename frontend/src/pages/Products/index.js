import React from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    function loadProducts() {
      api
        .get("products")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(error => {
          Swal.fire("Error!", error.message, "error");
        });
    }
    return loadProducts();
  }, []);

  const view = (id) => { history.push(`/products/${id}`); }
  const edit = (id) => { history.push(`/products/${id}/edit`); }
  const remove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/products/${id}`).then(response => {
          Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success' );
        })
      }
    })
  }

  return (
    <div className="container">
      <h1 className="mb-3 fw-normal">My Products</h1>
      <hr />
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, key) => (
            <tr key={key}>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>€{item.price}</td>
              <td>
                <button type="button" onClick={() => view(item.id)} className="btn">{<FaEye />}</button>
                <button type="button" onClick={() => edit(item.id)} className="btn">{<FaEdit />}</button>
                <button type="button" onClick={() => remove(item.id)} className="btn">{<FaTrash />}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
