import React, { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";
import { isAuthenticated } from "../../../services/auth";
import PostForm from "../../../components/PostForm";
import Swal from "sweetalert2";

export default function NewPost() {
  const [posts, setPosts] = useState([]);

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

  const updatePosts = useCallback(posts => setPosts(posts), []);

  return (
    <>
      {isAuthenticated() === true && (
        <PostForm refreshPost={updatePosts}></PostForm>
      )}
    </>
  );
}
