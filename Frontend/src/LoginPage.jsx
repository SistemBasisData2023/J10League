import style from "./style";
import { Navbar, Login, Footer } from "./components";

const LoginPage = () => {
    return (
        <div className="bg-primary w-full relative pt-9">
            <Navbar />
            
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