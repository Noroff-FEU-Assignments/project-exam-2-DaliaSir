import { useState, useEffect } from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import Heading from "../layout/Heading";
import Accommodation from "./Accommodation";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function HomePage() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;
  document.title = `Holidaze | Accommodations`;

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const response = await fetch(url);
        console.log(response);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setAccommodations(json);
        } else {
          setError("An error occurred");
        }

      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }

    }
    fetchAccommodations();

  }, [url]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner animation="border" />
      </div >
    );
  }

  if (error) {
    return <Alert variant="danger">An error occurred: {error}</Alert>;
  }



  return (
    <>
      <Heading content="Accommodations" />
      <Row className="product-container">
        {accommodations.map((accommodation) => {
          const { id, name, images, price } = accommodation;
          return <Accommodation key={id} id={id} name={name} image={images[0].url} price={price} />
        })}
      </Row>
    </>
  );
}
