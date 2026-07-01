import { Link } from "react-router-dom";
import { formatCurrency } from "../units/formatCurrency";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({item}){
  
   const addToCart = useCartStore(state => state.addToCart)

  return (
  <Link to={`/${item.slug}`}>
    <div className="product-card">
                <div className="product-image-wrapper">
                     {/* <div class="product-badge">Ръчна изработка</div>  */}
                    <img src={item.img} alt="THOK Custom Keyboard" className="product-image" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-switches"></p>
                    <div className="product-price-row">
                        <span className="price">{formatCurrency(item.price, item.currency)}</span>
                        <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(item)}
                        aria-label="Add to cart">
                            +
                        </button>
                    </div>
                </div>
            </div>
    </Link>)
}