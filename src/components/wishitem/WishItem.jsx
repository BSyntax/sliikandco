import { Link } from "react-router-dom";
import Button from "../controls/Button";
import { RiCloseFill, RiDeleteBinLine } from "react-icons/ri";
import { RiDeleteBinFill } from "react-icons/ri";

export default function WishItem({
  product,
  handleAddCart,
  removeFromWishlist,
}) {
  const { name, price, dateAdded, inStock, image, id } = product;
  const formattedDate = new Date(dateAdded).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="wishitem">
      <div className="wishitem-product">
        <div className="wishitem-image">
          <img src={image} alt={name} />
        </div>
        <div className="product-name">
          <Link
            to={`/product/${id || product._id}`}
            className="wishlist-item-name"
          >
            {name}
          </Link>
        </div>
      </div>
      <p className="wishitem-price">R{price}</p>
      <p className="wishitem-date">{formattedDate}</p>
      <p className="wishitem-status">{inStock ? "In Stock" : "Out of stock"}</p>
      <div className="wishitem-actions">
        <Button text="Add to Cart" onClick={handleAddCart} type="button" />
        <RiDeleteBinFill className="cancel-icon" onClick={removeFromWishlist} />
      </div>
    </div>
  );
}
