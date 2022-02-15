import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function EnquiryItem({ id, name, email, phone, guests, check_in, check_out }) {
  return (
    <Col sm={6} md={4} className="g-4" key={id}>
      <Card >
        <Card.Body>
          <Card.Title>Sender: {name}</Card.Title>
          <Card.Title>Email: {email}</Card.Title>
          <Card.Text>
            Phone: {phone}
            Guests: {guests}
            Check in: {check_in}
            Check out: {check_out}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

EnquiryItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  guests: PropTypes.number.isRequired,
  check_in: PropTypes.string.isRequired,
  check_out: PropTypes.string.isRequired,

};

EnquiryItem.defaultProps = {
  name: "Anonymous"
}

export default EnquiryItem;