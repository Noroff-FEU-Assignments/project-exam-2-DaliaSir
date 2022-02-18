import topBanner from "../../images/mao-yuqing-15-unsplash155.jpg"
import Heading from "../layout/Heading";
import SearchAccommodations from "./SearchAccommodations";
import { Link } from "react-router-dom";


export default function HomePage() {
  document.title = `Holidaze | Home`;
  return (
    <div className="home-container">
      <div className="top-banner" style={{ backgroundImage: `url(${topBanner})` }}>
        <div className="top-banner__search-container">
          <Heading size="2" content="Find a Place to stay in Bergen" />
          <div className="top-banner__search-container--service">
            <p>safe and easy booking</p>
            <span className="dot"></span>
            <p>24/7 customer service</p>
            <span className="dot"></span>
            <p>no booking fees</p>
          </div>
          <div className="top-banner__search-container--search-bar">
            <SearchAccommodations />
          </div>
          <div className="top-banner__search-container--link">
            <Link to="/accommodations" className="btn">View all Accommodations</Link>
          </div>
        </div>
      </div>
    </div>
  );

}