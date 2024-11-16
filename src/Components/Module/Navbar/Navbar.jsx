import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate ()

  const handleSearch = ()=>{
            if(query.trim()){
                navigate(`/search/${query}`)
            }
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(isMenuOpen);
  }

  return (
    <>
      <div className={`${styles.navbarContainer} `}>
        <div className={`${styles.brandName} `}>MovieDb</div>

        <MenuIcon
        className={styles.menuIcon}
        onClick={toggleMenu}
        style={{ fontSize: 40, color: "white", cursor: "pointer" }}
      />

       {/* Menu Items */}
      <ul className={`${styles.menuItems} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <li>
          <Link to="/">Popular</Link>
        </li>
        <li>
          <Link to="/toprated">Top Rated</Link>
        </li>
        <li>
          <Link to="/upcoming">Upcoming</Link>
        </li>
      </ul>
        
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Movie Name"
            className={styles.InputContainer}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
