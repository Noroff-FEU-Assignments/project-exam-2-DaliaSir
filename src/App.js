import Navigation from "./components/layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/home/HomePage";
import AccommodationsPage from "./components/accommodations/AccommodationsPage";
import ContactPage from "./components/contact/ContactPage";
import SigninPage from "./components/signin/SigninPage";
import AdminAddPage from "./components/admin/AdminAddPage";
import AdminMessagesPage from "./components/admin/AdminMessagesPage";
import AdminEnquiresPage from "./components/admin/AdminEnquiresPage";
import DetailsPage from "./components/details/DetailsPage";
import "./sass/style.scss";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact="true" element={<HomePage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/admin/add" element={<AdminAddPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/enquires" element={<AdminEnquiresPage />} />
          <Route path="/detail/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
