import { Link } from "react-router-dom";

export default function ProductCard({item}){
  
  return (
  <Link to={item.link}>
    <div className="product-card">
                <div className="product-image-wrapper">
                     {/* <div class="product-badge">Ръчна изработка</div>  */}
                    <img src={item.img} alt="THOK Custom Keyboard" className="product-image" />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-switches"></p>
                    <div className="product-price-row">
                        <span className="price">{item.price}</span>
                        <button className="add-to-cart-btn" aria-label="Add to cart">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
    </Link>)
}