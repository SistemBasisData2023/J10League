import { schedule } from "../constants";
import styles, { layout } from "../style";
import { logo_mpl, logo_m4, logo_pialapresiden, logo_mdl } from "../assets";

// const FeatureCard = ({ icon, title, content, index }) => (
//   <div className={`flex flex-row p-6 rounded-[20px] ${index !== schedule.length - 1 ? "mb-6" : "mb-0"} schedule-card`}>
//     <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
//       <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
//     </div>
//     <div className="flex-1 flex flex-col ml-3">
//       <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
//         {title}
//       </h4>
//       <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
//         {content}
//       </p>
//     </div>
//   </div>

// );

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
    <div class="overflow-x-auto">
      <table class="table">
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
                    <img src={logo_mpl} alt="page-icon" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">MPL ID Season 11</div>
                  <div class="text-sm opacity-50">Indonesia</div>
                </div>
              </div>
            </td>
            <td>
              EVOS Legend vs Alter Ego
              <br />
              <span class="badge badge-ghost badge-sm">GROUP STAGE - BEST OF 3</span>
            </td>
            <td>21 April 2022</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={logo_m4} alt="page-icon" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">M4</div>
                  <div class="text-sm opacity-50">International</div>
                </div>
              </div>
            </td>
            <td>
              ECHO vs Blacklist International
              <br />
              <span class="badge badge-ghost badge-sm">LOWER FINAL - BEST OF 3</span>
            </td>
            <td>12 November 2022</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={logo_mdl} alt="page-icon" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">MDL ID Season 7</div>
                  <div class="text-sm opacity-50">Indonesia</div>
                </div>
              </div>
            </td>
            <td>
              Bigetron vs Rex Regum Qeon
              <br />
              <span class="badge badge-ghost badge-sm">UPPER FINAL - BEST OF 3</span>
            </td>
            <td>10 Mei 2022</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={logo_pialapresiden} alt="page-icon" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Piala Presiden 2022</div>
                  <div class="text-sm opacity-50">Indonesia</div>
                </div>
              </div>
            </td>
            <td>
              GPX vs UI Nera
              <br />
              <span class="badge badge-ghost badge-sm">GRAND FINAL - BEST OF 5</span>
            </td>
            <td>01 Januari 2022</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Teams</th>
            <th>Match Date</th>
            <th></th>
          </tr>
        </tfoot>

      </table>
    </div>
  </section>
);

export default Schedule;