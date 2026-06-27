import { useState,useEffect} from "react"
import { Link } from "react-router"
import '../css/homepage.css'
import { Keyboards } from  "../products/products.js"



export default function Homepage(){
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === CarouselItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) 

    return () => clearInterval(timer)
  }, [currentIndex])


  return (
    <main>
    <section className="static-hero">
      {CarouselItems.map((item, index) => {
        const isActive = index === currentIndex;
        
        return (
          <div 
            key={item.id} 
            className={`hero-page ${isActive ? 'active' : ''}`}
            style={{ display: isActive ? 'block' : 'none' }} // Simple visibility control
          >
            <div className={`hero-page-content idx${index}`}>
              <h1>{item.name}</h1>
              <p>{item.desc}</p>
              
              {item.btnText === "Coming soon" ? (
                <button className="btn-primary idx1" disabled>{item.btnText}</button>
              ) : (
                <Link to={item.link}>
                  <button className="btn-primary idx1">{item.btnText}</button>
                </Link>
              )}
            </div>      
            <img src={item.img} className={`imgIdx${index}`} alt={item.name} />
          </div>
        )
      })}

      <div className="carrusel-btns">
        {CarouselItems.map((_, index) => {
          const isActive = index === currentIndex;
          
          return (
            <button 
              key={index} 
              className="hero-corrusel--btn"
              onClick={() => setCurrentIndex(index)} 
            >
              <div 
                className="progressbar" 
                style={{ 
                  width: isActive ? '100%' : '0%',
                  transition: isActive ? 'width 3s linear' : 'none' 
                }}
              />
            </button>
          )
        })}
      </div> 
    </section>
    <section className="product-section">
            <h2 className="section-title">New Arrivals</h2>
                <div className="product-grid">
                   {Keyboards.map((keyboard)=> {
                    return(
                    <Link 
                    to={keyboard.link} 
                    key={keyboard.id}>
                    <div className="product-card">
                          <div className="product-image placeholder-img">
                              <img src={keyboard.img} alt="" />
                          </div>
                          <div className="product-info">
                              <h3>{keyboard.name}</h3>
                              <p>{keyboard.subTitle}</p>
                              <span className="price">{keyboard.price}</span>
                          </div>
                      </div></Link>
                    )})}
            </div>
        </section>
        <section className="product-section bg-light">
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-grid">
                {ShopsPreviw.map((shop) =>{
                  return(
                    <Link to={shop.link} key={shop.id}>
                      <div className="category-card placeholder-img">
                        <img src={shop.img} alt=""/>
                        <h3>{shop.title}</h3>
                      </div>
                    </Link>
                  )
                })}
            </div>
        </section>
        </main>
  )
}
const CarouselItems = [
  {
    id: 1,
    name: "Blue dragon",
    desc: "A full metal QMK/VIA wireless custom mechanical keyboard.",
    btnText: "Shop Now",
    link: "/product-blue-dragon",
    img: "/main/main-1.jpg"
  },
  {
    id: 2,
    name: "Blossom",
    desc: "A full metal QMK/VIA wireless custom mechanical keyboard.",
    btnText: "Coming soon",
    link: "#",
    img: "/main/main-2.jpg"
  },
  {
    id: 3,
    name: "Rainy 75",
    desc: "A full metal QMK/VIA wireless custom mechanical keyboard.",
    btnText: "Shop Now",
    link: "//product-rainy-75",
    img: "/product3/img5.jpeg"
  },
  {
    id: 4,
    name: "Monochrome",
    desc: "A full metal QMK/VIA wireless custom mechanical keyboard.",
    btnText: "Coming soon",
    link: "#",
    img: "/main/main-4.avif"
  }
]

const ShopsPreviw = [
  {
    id: 1,
    title: "Custom Keyboards",
    link: "/shop-keyboards",
    img: "/product3/img3.jpg"
  },
  {
    id: 2,
    title: "Keycaps",
    link: "/shop-keycaps",
    img: "/key-product1/img1.jpg"
  },
  {
    id: 3,
    title: "Switches",
    link: "/shop-switches",
    img: "/caps-product1/img1.webp"
  },
  {
    id: 4,
    title: "Accessories",
    link: "/shop-accessories",
    img: "/acc-product2/img1.webp"
  }
  
]

