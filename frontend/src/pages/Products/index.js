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
        .get("product")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(error => {
          Swal.fire("Error!", error.message, "error");
        });
    }
    return loadProducts();
  }, []);

  const view = (id) => { history.push(`/product/${id}`); }
  const edit = (id) => { history.push(`/product/${id}/edit`); }
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
        api.delete(`/product/${id}`).then(response => {
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        }).catch((err) => {
          Swal.fire('Error!', err.message, 'error')
        })
      }
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col"><h1 className="mb-3 fw-normal">My Products</h1></div>
        <div className="col"><button className="btn btn-primary btn-lg float-end" role="button" onClick={() => history.push('/product/create')}>Create Product</button></div>
      </div>

      <br />

      {products.length ? (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col" className="col-2 text-center" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>€ {parseFloat(item?.price)?.toFixed(2)}</td>
                <td className="text-center">
                  <button type="button" onClick={() => view(item.id)} className="btn">{<FaEye color="blue" />}</button>
                  <button type="button" onClick={() => edit(item.id)} className="btn">{<FaEdit color="orange"/>}</button>
                  <button type="button" onClick={() => remove(item.id)} className="btn">{<FaTrash color="red" />}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
          <div className="alert alert-info" role="alert">
            No found records!
          </div>
        )}
    </div>
  );
}
