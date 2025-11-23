import { NavLink } from "react-router-dom";
import MenuImage from "../../assets/images/hero-1.webp";

export default function DropDownModel({ type }) {
  const content = {
    shop: {
      Men: [
        { name: "Tops", path: "/shop/men/tops" },
        { name: "Jackets & Coats", path: "/shop/men/jackets" },
        { name: "Pants & Jeans", path: "/shop/men/pants" },
        { name: "Accessories", path: "/shop/men/accessories" },
      ],
      Women: [
        { name: "Tops", path: "/shop/women/tops" },
        { name: "Dresses", path: "/shop/women/dresses" },
        { name: "Jackets & Coats", path: "/shop/women/jackets" },
        { name: "Pants & Skirts", path: "/shop/women/pants-skirts" },
        { name: "Accessories", path: "/shop/women/accessories" },
      ],
    },
    collection: {
      Curated: [
        { name: "New Arrivals", path: "/collection/new-arrivals" },
        { name: "Street Luxe", path: "/collection/street-luxe" },
        { name: "Minimalist Edit", path: "/collection/minimalist-edit" },
        { name: "Evening & Chic", path: "/collection/evening-chic" },
        { name: "Essentials", path: "/collection/essentials" },
        { name: "Seasonal Drop", path: "/collection/seasonal-drop" },
      ],
    },
  };

  if (type === "shop") {
    return (
      <div className="dropdown-content columns">
        {Object.entries(content.shop).map(([category, items], index) => (
          <ul key={index} className="dropdown-column shop">
            <li className="dropdown-category">{category}</li>
            {items.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} className="dropdown-item">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
        <div className="menu-image">
          <img src={MenuImage} alt="menu image" />
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown-content">
      {Object.entries(content.collection).map(([category, items], index) => (
        <ul key={index} className="dropdown-column collection">
          <li className="dropdown-category">{category}</li>
          {items.map((item, i) => (
            <li key={i}>
              <NavLink to={item.path} className="dropdown-item">
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
      <div className="menu-image">
        <img src={MenuImage} alt="menu image" />
      </div>
    </div>
  );
}
