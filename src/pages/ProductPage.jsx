
import '../css/product.css'

export default function ProductPage({product}){



  return(
    <main className="product-container" key={product.id}>
        
        <section className="image-gallery">
            <div className="main-image">
                <img src={product.images[0]} />
                <span className="image-caption">*Real Photo</span>
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img)=>
                {return (<div className="thumb active">
                  <img src={img} alt="Thumb" />
                </div>)
                })}
                
            </div> 
        </section>

        <section className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-subtitle">{product.desc}</h2>

            <p className="disclaimer-text">
                Keyboard photos are from round 1 and may contain keycaps not included in this base kit.
            </p>
            
            <div className="product-price">{product.price}</div>
            
            <p className="shipping-note"><a href="#">Shipping</a> calculated at checkout.</p>
            
            <div className="quantity-selector">
                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" value="1" min="1" />
            </div>
            <div className="btn-div">
                  <button>Buy now</button>
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