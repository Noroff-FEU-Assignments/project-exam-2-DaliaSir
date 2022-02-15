import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL, ENQUIRY_PATH } from "../../constants/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import FormError from "../common/FormError";
import Form from "react-bootstrap/Form";

const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your full name").min(3, "Full name must be at least 3 characters"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
  phone: yup.number().positive("Number of beds must be a positive number").integer(),
  guests: yup.string().required("Please enter number of guests staying").min(1, "At least 1 guest required"),
  check_in: yup.date().required("Please select check in date"),
  check_out: yup.date().required("Please select check out date"),
});

export default function DetailsPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImageShow, setModalImageShow] = useState(false);
  const [modalBookShow, setModalBookShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setsubmittingError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  let { id } = useParams();

  const url = BASE_URL + `accommodations/${id}`;
  const urlEnquiries = BASE_URL + ENQUIRY_PATH;
  document.title = `Holidaze | ${product.name}`;

  useEffect(function () {
    async function getData() {
      try {
        const response = await axios.get(url);
        console.log("response", response);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getData();

  }, [url]);

  if (loading) return (
    <div className="d-flex justify-content-center m-5">
      <Spinner animation="border" />
    </div >
  );;

  if (error) return <Alert variant="danger">An error occurred: {error}</Alert>;



  function ImageModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="details-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body >
          <Carousel variant="dark" className="details-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images[0].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images[1].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images[2].url}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images[3].url}
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images[4].url}
                alt="Fifth slide"
              />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  async function onSubmit(data) {
    setSubmitting(true);
    setsubmittingError(null);

    console.log(data);

    try {
      const response = await axios.post(urlEnquiries, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setsubmittingError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  function BookModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book {product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-container__form">
            <p className="contact-container__form--success-message">
              {isSubmitSuccessful ? "You have successfully sent booking!" : ""}
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} >
              {submittingError && <FormError>{submittingError}</FormError>}
              <fieldset disabled={submitting}>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Full Name</Form.Label>
                  <input {...register("name")} className="form-control" placeholder="Your full name" />
                  {errors.name && <FormError>{errors.name.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Email</Form.Label>
                  <input {...register("email")} className="form-control" placeholder="Your email address" />
                  {errors.email && <FormError>{errors.email.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Phone</Form.Label>
                  <input {...register("phone")} className="form-control" placeholder="Your phone number" />
                  {errors.phone && <FormError>{errors.phone.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Guests</Form.Label>
                  <input {...register("guests")} className="form-control" placeholder="Number of guests" />
                  {errors.guests && <FormError>{errors.guests.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Check in</Form.Label>
                  <input {...register("check_in")} type="date" />
                  {errors.check_in && <FormError>{errors.check_in.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 contact-container__form--form-group" >
                  <Form.Label>Check out</Form.Label>
                  <input {...register("check_out")} type="date" />
                  {errors.check_out && <FormError>{errors.check_out.message}</FormError>}
                </Form.Group>
                <button type="submit" className="btn btn-primary">{submitting ? 'Booking...' : 'Book'}</button>
              </fieldset>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          {/* <Button onClick={handleBook}>Book</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }



  return (
    <>
      <div className="breadcrumb">
        <Link to={`/accommodations`}>Back</Link>
      </div>
      <Heading content={product.name} />
      <div className="details-container container" >
        <Row>
          <Col className="details-container__image details-container__image-main" style={{ backgroundImage: `url(${product.images[0].url})` }}></Col>

          <Col>
            <Row>
              <Col className="details-container__image" style={{ backgroundImage: `url(${product.images[1].url})` }}></Col>
              <Col className="details-container__image" style={{ backgroundImage: `url(${product.images[2].url})` }}></Col>
            </Row>
            <Row className="details-container__row2">
              <Col className="details-container__image" style={{ backgroundImage: `url(${product.images[3].url})` }}></Col>
              <Col className="details-container__image" style={{ backgroundImage: `url(${product.images[4].url})` }}></Col>
              <Col className="details-container__btn-view">
                <Button variant="primary" onClick={() => setModalImageShow(true)}>
                  View images
                </Button>
              </Col>
              <ImageModal
                show={modalImageShow}
                onHide={() => setModalImageShow(false)}
              />
            </Row>
          </Col>
        </Row>


        <Row>
          <p>{product.price} nok / per night</p>
          <div>
            <p>Guests {product.guests}</p>
            <p>Beds {product.beds}</p>
          </div>
          <p>{product.address}</p>
          <p>{product.description}</p>
        </Row>
        <Button variant="primary" onClick={() => setModalBookShow(true)}>
          Book
        </Button>
        <BookModal
          show={modalBookShow}
          onHide={() => setModalBookShow(false)}
        />

      </div>
    </>
  );
}

// let imageUrl = 'https://images.unsplash.com/photo-1612437118782-84bb46a5c95a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80';
// if (product.images.length > 0) {
//   for (let i = 0; i < product.images.length; i++) {
//     imageUrl = product.images[1].url;
//   }
  
// }