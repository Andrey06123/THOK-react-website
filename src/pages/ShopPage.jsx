import { Keyboards, Keycaps, Switches, Accessories } from  "../products/products.js"
import ProductCard  from "../components/ProductCard.jsx"
import "../css/shop.css"


export default function ShopPage({products}){
  if (!products) return null;

  return(
    <main className="shop-container">
        
        <div className="shop-toolbar">
            <div className="filter-group">
                <button className="filter-btn active">Всички</button>
                {/* <!-- <button class="filter-btn">Клавиатури</button>
                <button class="filter-btn">Суичове</button>
                <button class="filter-btn">Капачки</button> --> */}
            </div>
            
            <div className="sort-group">
                {/* <label for="sort-select">Сортирай по:</label> */}
                <label>Сортирай по:</label>
                <select id="sort-select" className="sort-dropdown">
                    <option value="featured">Препоръчани</option>
                    <option value="price-low">Цена: Възходяща</option>
                    <option value="price-high">Цена: Низходяща</option>
                    <option value="newest">Най-нови</option>
                </select>
            </div>
        </div>

        <div className="product-grid">
            
          {products.map((item) => {
            return (
              <ProductCard key={item.id} item={item}></ProductCard>
            )
          })}
        </div>
    </main>
  )
}