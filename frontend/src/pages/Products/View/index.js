import React from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Product() {
  const [product, setProduct] = React.useState({});
  const [error, setError] = React.useState('');
  const { id } = useParams();

  const history = useHistory();

  React.useEffect(() => {
    function loadProduct() {
      api
        .get(`product/${id}`)
        .then(({ data }) => {
          setProduct(data);
        })
        .catch(error => {
          setError(error.response.data.message);
        });
    }
    return loadProduct();
  }, []);

  return (
    <div className="container mt-3">

      {
        error ? (
          <div className="text-center">
            <div className="alert alert-danger my-5 py-4" role="alert">{error}</div>
            <a className="btn-link" role="button" onClick={() => history.push('/')}>Back to home</a>
          </div>
        ) : (
            <>
              <div className="btn" role="button" onClick={() => history.goBack()}><FaArrowLeft /> Back</div>
              <div className="row mt-5">
                <div className="col-5">
                  <img className="img-thumbnail h-100 w-100" src={product?.image} />
                </div>
                <div className="col-6">
                  <h1 className="mb-3 fw-normal text-capitalize">{product?.name}</h1>
                  <p className="mb-3 fw-normal">{product?.description}</p>
                  <p className="h1 fw-bolder text-danger">€ {parseFloat(product?.price)?.toFixed(2)}</p>
                  <strong className="mb-2 text-secondary">Published in {product?.created_at} by {product?.user?.name}.</strong>
                </div>
              </div>
            </>
          )
      }

    </div>
  )
}
