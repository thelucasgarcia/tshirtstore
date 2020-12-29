import React, { useState } from "react";
import api from "../../services/api";
import { login } from "../../services/auth";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmitform(event) {
    event.preventDefault();

    api
      .post("/auth/register", { name, email, password })
      .then(({ data }) => {
        login(data);        
      })
      .catch(error => Swal.fire("Error!", error.message, "error"));
  }

  return (
    <main className="form-signin my-5">
      <form onSubmit={e => handleSubmitform(e)}>
      <h1 className="mb-5 fw-bold text-center">Create an account</h1>
        <label htmlFor="inputName" className="visually-hidden">Name</label>
        <input type="text" id="inputName" className="form-control" placeholder="Name" value={name} required onChange={e => setName(e.target.value)} />
        <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} required onChange={e => setEmail(e.target.value)} />
        <label htmlFor="inputPassword" className="visually-hidden" >Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
        <button className="w-100 btn btn-lg btn-danger my-3" type="submit">Create your account</button>
      </form>
    </main>
  );
}
