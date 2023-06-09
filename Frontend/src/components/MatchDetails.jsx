import { details_team1, details_team2 } from "../constants";
import * as assets from "../assets";
import styles, { layout } from "../style";

const FeatureCard = ({ index }) => (
  <section>
    <div className={`overflow-x-auto ${index !== details_team1.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
      <table className={`table ${styles.flexCenter}`}>
        <thead>
          <tr>
            <th>In Game Name</th>
            <th>K/D/A</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {details_team1.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={data.hero} alt="page-icon" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"> {data.ign} </div>
                    </div>
                  </div>
                </td>
                <td>
                  {data.kda}
                  <br />
                </td>
                <td> {data.details} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className={`overflow-x-auto ${index !== details_team2.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
      <table className={`table ${styles.flexCenter}`}>
        <thead>
          <tr>
            <th>In Game Name</th>
            <th>K/D/A</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {details_team2.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={data.hero} alt="page-icon" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"> {data.ign} </div>
                    </div>
                  </div>
                </td>
                <td>
                  {data.kda}
                  <br />
                </td>
                <td> {data.details} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

const MatchDetails = () => (
  <section id="matchdetails" className={layout.section}>
    <div className={`${layout.sectionImg} flex-col`}>
      <h1 className="justify-center font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
        <span className="text-gradient"> Team A</span> <br className="sm:block hidden" />{" "}
        <span> VS </span><br className="sm:block hidden" />{" "}
        <span className="text-gradient"> Team B</span> <br className="sm:block hidden" />{" "}
      </h1>
    </div>

    <div className={`${layout.sectionInfo} flex-col`}>
      <FeatureCard />
    </div>
  </section>
);
export default MatchDetails;