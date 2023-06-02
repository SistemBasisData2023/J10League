import style from "./style";
import { Navbar, Login, Footer } from "./components";

const LoginPage = () => (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${style.paddingX} ${style.flexCenter}`}>
            <div className={`${style.boxWidth}`}>
                <Navbar />
            </div>
        </div>

        <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
            <div className={`${style.boxWidth}`}>
                <Login />
                <Footer />
            </div>
        </div>
    </div>
);

export default LoginPage;
