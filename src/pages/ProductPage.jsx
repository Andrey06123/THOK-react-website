import { useState } from 'react'
import '../css/product.css'
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../units/formatCurrency';

export default function ProductPage({product}){
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(state => state.addToCart)

  return(
    <main className="product-container" key={product.id}>
        
        <section className="image-gallery">
            <div className="main-image">
                <img src={product.images[index]} />
                <span className="image-caption">*Real Photo</span>
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img, i)=>
                {return (
                <div key={i}
                    className={`thumb ${index === i ? "active" : ""}`}
                    onClick={() => setIndex(i)}>
                  <img src={img} alt="Thumb" />
                </div>)
                })}
                
            </div> 
        </section>

        <section className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-subtitle">{product.subTitle}</h2>

            <p className="disclaimer-text">{product.subSubTitle}
            </p>
            
            <div className="product-price">{formatCurrency(product.price, product.currency)}</div>
            
            <p className="shipping-note"><a href="#">Shipping</a> calculated at checkout.</p>
            
            <div className="quantity-selector">
                <p><b>Quantity: </b></p>
                <div className="quantity-counter">
            <button onClick={
                () => setQuantity(prev => Math.max(prev - 1, 1))
                }>
                <img src="/icons/round-minus.svg" alt="" />
            </button>

            <p>{quantity}</p>

            <button onClick={
                () => setQuantity(prev => prev + 1)}>
                <img src="/icons/round-plus.svg" alt="" />
            </button>
            </div>
            </div>
            <div className="btn-div"
            // onClick={() => {
            //     // const item = new CartItem(product.name, product.price, quantity, product.img)
            //     // if(cartItems.includes(product.name)){
            //     //     console.log(item)
            //     //     return;
            //     // }
            //     // cartItems.push(item);

            // }}
            >
                  <button onClick={() => addToCart(product , quantity)}>
                    Buy now
                    </button>
            </div>

            <div className="accordion-group">
                <div className="accordion-item">
                    <button className="accordion-trigger">Specifications <span className="icon">+</span></button>
                </div>
                
                {/* <!-- <div className="accordion-item">
                    <button className="accordion-trigger">Timeline <span className="icon">+</span></button>
                </div>
                <div className="accordion-item">
                    <button className="accordion-trigger">Proxies <span className="icon">+</span></button>
                </div> --> */}
            </div>
        </section>
    </main>
  )
}