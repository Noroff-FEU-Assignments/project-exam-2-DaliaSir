import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Accommodation({ id, name, image, price }) {

  return (
    <Col sm={6} md={4} className="g-4" key={id}>
      <Link to={`/detail/${id}`}>
        <Card >
          <Card.Img variant="top" src={image} alt={name} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              Price: {price}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

Accommodation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

Accommodation.defaultProps = {
  name: "Accommodation"
}