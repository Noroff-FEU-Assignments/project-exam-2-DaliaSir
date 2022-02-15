import Heading from "../layout/Heading";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  document.title = `Holidaze | Contact`;
  return (
    <>

      <Heading content="Contact" />
      <ContactForm />
    </>
  );
}