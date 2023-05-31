import { result } from "../constants";
import styles, { layout } from "../style";

const FeatureCard = ({ icon, title, content, index }) => (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== result.length - 1 ? "mb-6" : "mb-0"} result-card`}>
        <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
            <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
        </div>
        <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                {content}
            </p>
        </div>
    </div>

);

const Results = () => (
    <section id="result" className={layout.section}>
        <div className={layout.sectionInfo}>
            <h1 className="flex-1 font-poppins font-semibold ss:text-[50px] text-[5px] text-white ss:leading-[100.8px] leading-[75px]">
                <span className="text-gradient">Completed Match</span>{" "}
            </h1>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            {result.map((result, index) => (
                <FeatureCard key={result.id} {...result} index={index} />
            ))}
        </div>
    </section>
);

export default Results;