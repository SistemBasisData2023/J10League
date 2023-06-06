import style from "./style";
import { Schedule, Results, Footer, Navbar, Hero } from "./components";

const MainPage = () => {
    return (
        <div className="bg-primary w-full relative pt-9">
            <Navbar />

            <div className={`bg-primary ${style.flexStart}`}>
                <div className={`${style.boxWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
                <div className={`${style.boxWidth}`}>
                    <Schedule />
                    <Results />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MainPage