import Heading from "../layout/Heading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import FormError from "../common/FormError";
import Form from "react-bootstrap/Form";



const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter the name of the place").min(3, "Name must be at least 3 characters"),
  address: yup.string().required("Please enter an address").min(10, "The address must be at least 10 characters"),
  price: yup.number().required("Please enter the price").positive("Value of price must be a positive number").integer(),
  guests: yup.number().required("Please enter the max number of guests").positive("Number of guests must be a positive number").integer().min(1),
  beds: yup.number().required("Please enter the number of beds").positive("Number of beds must be a positive number").integer().min(1),
  images: yup.mixed().nullable(),
  is_featured: yup.boolean(),
  description: yup.string().required("Please enter the description").min(10, "The description must be at least 10 characters"),
  category: yup.string().required("Please select the category"),
});


export default function AdminAddPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setsubmittingError] = useState(null);
  const [success, setSuccess] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;
  const http = useAxios();
  document.title = `Holidaze | Admin`;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  let formData = new FormData();

  const handleChange = (e) => {
    console.log(e.target.files);
    if (e.target && e.target.files) {
      formData.append("file", e.target.files[0]);
    }
  }

  async function onSubmit(data) {
    setSubmitting(true);
    setsubmittingError(null);

    console.log(data);

    try {
      const response = await http.post(url, {
        name: data.name,
        address: data.address,
        price: data.price,
        guests: data.guests,
        beds: data.beds,
        images: data.images.url,
        is_featured: data.is_featured,
        description: data.description,
        category: data.category,
      });
      console.log("response", response.data);
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setsubmittingError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }


  return (
    <>
      <Heading content="Add New Accommodation" />
      <div className="add-container__form">
        <p className="add-container__form--success-message">
          {success ? "You have successfully added a new accommodation!" : ""}
        </p>
        <Form onSubmit={handleSubmit(onSubmit)} >
          {submittingError && <FormError>{submittingError}</FormError>}
          <fieldset disabled={submitting}>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Name</Form.Label>
              <input {...register("name")} className="form-control" placeholder="Name of the place" />
              {errors.name && <FormError>{errors.name.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Address</Form.Label>
              <input {...register("address")} className="form-control" placeholder="Address of the place" />
              {errors.address && <FormError>{errors.address.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Price</Form.Label>
              <input {...register("price")} className="form-control" placeholder="Price per night (NOK)" />
              {errors.price && <FormError>{errors.price.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Guests</Form.Label>
              <input {...register("guests")} className="form-control" placeholder="Maximum number of guests" />
              {errors.guests && <FormError>{errors.guests.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Beds</Form.Label>
              <input {...register("beds")} className="form-control" placeholder="Number of beds" />
              {errors.beds && <FormError>{errors.beds.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Images</Form.Label>
              <input {...register("images")} className="form-control" type="file" accept="image/*" multiple placeholder="Upload images" onChange={handleChange} />
              {errors.images && <FormError>{errors.images.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Featured</Form.Label>
              <input {...register("is_featured")} className="form-check-input" type="checkbox" placeholder="Check if it is featured" />
              {errors.is_featured && <FormError>{errors.is_featured.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 contact-container__form--form-group" >
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("category")}>
                <option value="">Select a category..</option>
                <option value="bed and breakfast">Bed and Breakfast</option>
                <option value="guest house">Guest House</option>
                <option value="hotel">Hotel</option>
              </Form.Select>
              {errors.category && <FormError>{errors.category.message}</FormError>}
            </Form.Group>
            <Form.Group className="mb-3 add-container__form--form-group" >
              <Form.Label>Description</Form.Label>
              <textarea rows={6} {...register("description")} className="form-control" placeholder="The description of the place" />
              {errors.description && <FormError>{errors.description.message}</FormError>}
            </Form.Group>
            <button type="submit" className="btn btn-primary">{submitting ? 'Sending...' : 'Send'}</button>
          </fieldset>
        </Form>
      </div>
    </>
  );
}

