import styles from "../style";
import { heroml } from "../assets";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} pt-12`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            J10 League <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Mobile Legends</span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[65px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Monitoring Website.
        </h1>
        <div className={`${styles.paragraph} max-w-[470px] mt-5`}>
          <h1>Created By:</h1>
          <h2>Arka Brian Dewara</h2>
          <h3>Muhammad Fathan Muhandis</h3>
          <h4>Jeffri</h4>
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={heroml} alt="page-icon" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
    </section>
  );
};

export default Hero;
