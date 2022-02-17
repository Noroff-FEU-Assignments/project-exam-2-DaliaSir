import Heading from "../layout/Heading";
import ContactForm from "./ContactForm";
import Container from "react-bootstrap/Container";

export default function ContactPage() {
  document.title = `Holidaze | Contact`;
  return (
    <Container>
      <Heading content="Contact" />
      <ContactForm />
    </Container>
  );
}