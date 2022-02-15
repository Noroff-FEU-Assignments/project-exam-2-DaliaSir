import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function MessageItem({ id, name, email, message }) {
  return (
    <Col sm={6} md={4} className="g-4" key={id}>
      <Card >
        <Card.Body>
          <Card.Title>Sender: {name}</Card.Title>
          <Card.Title>Email: {email}</Card.Title>
          <Card.Text>Message: {message}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

MessageItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

MessageItem.defaultProps = {
  name: "Anonymous"
}

export default MessageItem;