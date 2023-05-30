import style from "./style";
import { Business, Footer, Navbar, Hero } from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${style.paddingX} ${style.flexCenter}`}>
      <div className={`${style.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${style.flexStart}`}>
      <div className={`${style.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
      <div className={`${style.boxWidth}`}>
        <Business />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
