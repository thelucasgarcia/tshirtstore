import React, { useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function PostForm({ refreshPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { id } = useParams();

  React.useEffect(() => {
    function getPost() {
      api.get(`/posts/${id}`).then(response => {
        setTitle(response.data.title);
        setBody(response.data.body);
      });
    }

    if (id) { getPost(); }
  }, [id]);

  function handleSubmitform(e) {
    e.preventDefault();
    id ? edit() : create();
  }

  function clearFields() {
    setTitle("");
    setBody("");
  }

  function create() {
    api
      .post("/posts", { title, body })
      .then(({ data }) => {
        refreshPost(data);
        clearFields();
        Swal.fire("Registered Post!", "Your post has been successfully registered!", "success"
        );
      })
      .catch(error => Swal.fire("Error!", error.message, "error"));
  }

  function edit() {
    api
      .put("/posts/" + id, { title, body })
      .then(({ data }) => {
        refreshPost(data);
        Swal.fire( "Post Edited!", "Your post has been successfully edited!", "success");
      })
      .catch(error => Swal.fire("Error!", error.message, "error"));
  }

  return (
    <div className="container">
      <h1 className="mb-3 fw-normal">{ id ? 'Edit Entry' : 'New Entry'}</h1>
      <hr />
      <form onSubmit={e => handleSubmitform(e)}>
        <div className="form-group row">
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label"> Title:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputBody" className="col-sm-2 col-form-label"> Entry:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="inputBody"
              value={body}
              onChange={e => setBody(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="form-group row mt-5">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary"> Save Entry </button>
          </div>
        </div>
      </form>
    </div>
  );
}
