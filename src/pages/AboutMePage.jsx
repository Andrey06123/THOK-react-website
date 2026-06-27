import "../css/about-me.css"
import { Link } from "react-router"

export default function AboutMe({ aboutMe }){
  
    if(aboutMe === "contacts"){
      return(<main className="contact-container">
        <h1>Контакти</h1>
        <p className="subtitle">Ако проблем с клавиатура или поръчка? Свържете се с нас.</p>       
        <div className="contact-card">
            <div className="contact-item">
                <div className="icon-box"><i class="fa-regular fa-envelope"></i></div>
                <div className="details">
                    <h3>Email Us</h3>
                    <a href="#">------</a>
                </div>
            </div>

            <div className="contact-item">
                <div className="icon-box"><i class="fa-solid fa-phone"></i></div>
                <div className="details">
                    <h3>Call Us</h3>
                    <a href="#">------</a>
                </div>
            </div>

            <div className="contact-item">
                <div className="icon-box"><i class="fa-solid fa-location-dot"></i></div>
                <div className="details">
                    <h3>Visit Us</h3>
                    <p>----------</p>
                </div>
            </div>
        </div>
    </main>)
    }
    return(
      <main className="story-container">
        
        <span className="story-badge">Нашата История</span>
        <h1 className="story-title">От страст към съвършенство</h1>
          
        <div className="story-content">
            <p className="highlight-text">
                Зад този проект не стои голяма корпорация или фабрика, а просто един човек с огромна страст към механичните клавиатури.
            </p>
            
            <p>
                Всичко започна от желанието да създам перфектното работно място. Процесът по подбор на правилната платка, перфектните стабилизатори, лубрикирането на всеки един суич и намирането на точния профил капачки се превърна от личен интерес в мисия: да помогна на повече хора да се докоснат до истинското <span>custom</span> усещане.
            </p>
            
            <p>
                Всеки проект е индивидуален, сглобен изцяло на ръка и персонализиран според вашите изисквания за звук и усещане при писане. Защото вашата клавиатура трябва да бъде толкова уникална, колкото сте и самите вие.
            </p>
        </div>

        <div className="story-footer">
            <Link to="/" className="btn-primary">Разгледай клавиатурите</Link>
        </div>
        
    </main>
    )
  
}