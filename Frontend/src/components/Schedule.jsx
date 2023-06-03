import { schedule } from "../constants";
import styles, { layout } from "../style";

const FeatureCard = ({ index }) => (
  <div className={`overflow-x-auto ${index !== schedule.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
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
        {schedule.map((data, index) => {
          return (
            <tr key={ index }>
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
                {data.teams}
                <br />
                <span className="badge badge-ghost badge-sm"> {data.match_details} </span>
              </td>
              <td> {data.date} </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const Schedule = () => (
  <section id="schedule" className={layout.section}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          <span className="text-gradient"> Upcoming </span> <br className="sm:block hidden" />{" "}
          <span> Matches </span>{" "}
        </h1>
      </div>
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
        <FeatureCard/>
    </div>
  </section>
);
export default Schedule;
