import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Form from "react-bootstrap/Form";

const url = BASE_URL + TOKEN_PATH;

const validationSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function SigninForm() {
  const [submitting, setSubmitting] = useState(false);
  const [signinError, setSigninError] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setSigninError(null);

    console.log(data);

    try {
      const response = await axios.post(url, {
        identifier: data.username.toLowerCase(),
        password: data.password,
      });
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setSigninError("Username or password is incorrect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="signin-form">
      {signinError && <FormError>{signinError}</FormError>}
      <fieldset disabled={submitting}>
        <Form.Group className="mb-3" >
          <Form.Label>Username</Form.Label>
          <input {...register("username")} className="form-control" placeholder="Your username" />
          {errors.username && <FormError>{errors.username.message}</FormError>}
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <input {...register("password")} className="form-control" placeholder="Your password" type="password" />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </Form.Group>
        <button type="submit" className="btn btn-primary" >{submitting ? "Signing in..." : "Sign in"}</button>
      </fieldset>
    </Form>
  );
}
