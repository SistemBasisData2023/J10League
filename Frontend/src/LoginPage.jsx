import style from "./style";
import { Navbar, Login, Footer } from "./components";

const LoginPage = () => {
    return (
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${style.paddingX} ${style.flexCenter} flex-col md:absolute md:top-0 w-screen`}>
                <div className={`${style.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className={`bg-primary${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    <Login />
                </div>
            </div>

            <div className={`bg-primary ${style.paddingX} ${style.flexCenter} flex-col md:absolute md:bottom-0 w-screen`}>
                <div className={`${style.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    )
};

export default LoginPage;