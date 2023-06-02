import React from 'react'
import style from "./style";
import { Schedule, Results, Footer, Navbar, Hero, Login, Table } from "./components";

const MainPage = () => {
    return (
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
                    <Schedule />
                    <Results />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MainPage