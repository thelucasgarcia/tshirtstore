import React from "react";
import { Link } from "react-router-dom";

export default function ListProducts({ products }) {
  return (
    <article className="container blog-post">
      <h1 className="mb-3 fw-normal">Products List</h1>
      <hr />
      <div className="row mb-2">

        {products.length ? products.map((item, key) => (
          <div className="col-md-3" key={key}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h4 className="mb-0" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{item?.title}</h4>
                <div className="mb-1 text-muted">{item?.created_at}</div>
                <p className="card-text mb-auto" style={{ textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all' }}>{item?.body?.substring(0,80)}</p>
                <strong className="d-inline-block mb-2 text-primary">Author: {item?.user?.name}</strong>
                <Link to={`/products/${item?.id}`} className="stretched-link">Continue reading</Link>
              </div>
            </div>
          </div>
        )) : <p className="lead mt-5">No records found.</p>}

      </div>
    </article>
  );
}
