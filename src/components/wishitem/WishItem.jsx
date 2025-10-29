
import Button from "../controls/Button";
import { RiCloseFill } from "react-icons/ri";

export default function WishItem({
  product,
  handleAddCart,
  removeFromWishlist,
}) {
  return (
    <div className="wishitem">
      <div className="wishitem-product">
        <div className="cancel-icon" onClick={removeFromWishlist}>
          <RiCloseFill />
        </div>
        <div className="wishitem-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-name">
          <p>{product.name}</p>
        </div>
      </div>
      <p className="wishitem-price">${product.price}</p>
      <p className="wishitem-status">In Stock</p>
      <Button text="Add to Cart" action={handleAddCart} type="button" />
    </div>
  );
}
