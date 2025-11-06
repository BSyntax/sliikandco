import Button from "../controls/Button";
import { RiCloseFill } from "react-icons/ri";

export default function WishItem({
  product,
  handleAddCart,
  removeFromWishlist,
}) {
  const { name, price, dateAdded, stock, image } = product;
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
          <p>{name}</p>
        </div>
      </div>
      <p className="wishitem-price">R{price}</p>
      <p className="wishitem-date">{formattedDate}</p>
      <p className="wishitem-status">{stock}</p>
      <div className="wishitem-actions">
        <Button text="Add to Cart" action={handleAddCart} type="button" />
        <RiCloseFill className="cancel-icon" onClick={removeFromWishlist} />
      </div>
    </div>
  );
}
