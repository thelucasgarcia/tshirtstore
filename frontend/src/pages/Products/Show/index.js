import React, { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Post() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    function loadPost() {
      api
        .get(`posts/${id}`)
        .then(({ data }) => {
          setPost(data);
        })
        .catch(error => {
          Swal.fire("Error!", error.message, "error");
        });
    }
    return loadPost();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-3 fw-normal">Post</h1>
      <hr />
      <h1 className="h4 mb-3 fw-normal">{post.title}</h1>
      <div className="mb-1 text-muted">{post?.created_at}</div>
      <strong className="d-inline-block mb-2 text-primary">Author: {post?.user?.name}</strong>
      <p>{post.body}</p>

      <div className="btn-link" role="button" onClick={() => history.goBack()}><FaArrowLeft /> Back</div>
    </div>
  )
}
