import style from "./style";
import { Error } from "./components";

const ErrorPage = () => {
    return (
        <div className={`bg-primary${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24 bg-primary relative pt-9`}>
        <div className={`${style.boxWidth}`}>
            <Error />
        </div>
    </div>

    )
}

export default ErrorPage;