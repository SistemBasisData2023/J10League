import { features } from "../constants";
import styles, { layout } from "../style";

const FeatureCard = ({ icon, title, content, teams, date, match_details, index }) => (
    <div className={`overflow-x-auto ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <table className={`table ${styles.flexCenter}`}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Teams</th>
                    <th>Match Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img src= { icon } alt="page-icon" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold"> { title } </div>
                                <div class="text-sm opacity-50"> { content } </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        { teams }
                        <br />
                        <span class="badge badge-ghost badge-sm"> { match_details } </span>
                    </td>
                    <td> { date } </td>
                    <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
);

const Business = () => (
    <section id="features" className={layout.section}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                    <span className="text-gradient"> Upcoming </span> <br className="sm:block hidden" />{" "}
                    <span> Matches </span>{" "}
                </h1>
            </div>
        </div>

        <div className={`${layout.sectionImg} flex-col`}>
            {features.map((feature, index) => (
                <FeatureCard key={feature.id} {...feature} index={index} />
            ))}
        </div>
    </section>
);

export default Business;