import Heading from "../layout/Heading";
import { useState, useEffect } from "react";
import { BASE_URL, MESSAGE_PATH } from "../../constants/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + MESSAGE_PATH;

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(url);
        console.log(response);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setMessages(json);
        } else {
          setError("An error occurred");
        }

      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }

    }
    fetchMessages();

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
      <Heading content="Admin Messages" />
      <Row className="messages-container">
        {messages.map((message) => {
          return (
            <Col sm={6} md={4} className="g-4" key={message.id}>
              <Card >
                <Card.Body>
                  <Card.Title>Sender: {message.name}</Card.Title>
                  <Card.Title>Email: {message.email}</Card.Title>
                  <Card.Text>Message: {message.message}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
