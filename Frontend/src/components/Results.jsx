import { result } from "../constants";
import styles, { layout } from "../style";

const FeatureCard = ({ index }) => (
    <div className={`overflow-x-auto ${index !== result.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <table className={`table ${styles.flexCenter}`}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Winner</th>
                    <th>Score</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {result.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={data.icon} alt="page-icon" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold"> {data.title} </div>
                                        <div className="text-sm opacity-50"> {data.content} </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {data.winners}
                                <br />
                                <span className="badge badge-ghost badge-sm"> {data.match_details} </span>
                            </td>
                            <td> {data.score} </td>
                            <th>
                                <a href="/matchdetails" className="btn btn-ghost btn-xs">details</a>
                            </th>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

const Result = () => (
    <section id="result" className="text-center justify-center">
        <div className={`flex-1 sm:justify-end flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100px] leading-[55px] sm:py-4 py-2">
                    <span className="text-gradient"> Concluded </span>
                    <span> Matches </span>{" "}
                </h1>
            </div>
        </div>
        <div className={`flex justify-center sm:px-16 px-6 sm:py-12 py-4`}>
            <FeatureCard />
        </div>
    </section>
);
export default Result;