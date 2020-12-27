import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import ListPosts from "../../components/ListPosts";
import PostForm from "../../components/PostForm";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link, useHistory } from "react-router-dom";
export default function Posts() {
  
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    function loadPosts() {
      api
        .get("posts")
        .then(({ data }) => {
          setPosts(data);
        })
        .catch(error => {
          Swal.fire("Error!", error.message, "error");
        });
    }
    return loadPosts();
  }, []);

  const view = (id) => { history.push(`/posts/${id}`); }
  const edit = (id) => { history.push(`/posts/${id}/edit`); }
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
        api.delete(`/posts/${id}`).then(response => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        })
      }
    })
  }

  return (
    <div className="container">
      <h1 className="mb-3 fw-normal">My entries</h1>
      <hr />
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, key) => (
            <tr key={key}>
              <td>{item.title}</td>
              <td>{item.body}</td>
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
