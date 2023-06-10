import React, { useState } from "react";
import styles from "../style";
import { heroml2 } from "../assets";

const Login = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/LoginAdmin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, pass }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
              sessionStorage.setItem("isLogin", true);
              alert("Logged in successfully");
              // Perform any additional actions after successful login
            } else {
              alert("Failed to login");
              // Handle the error scenario
            }
          } catch (error) {
            console.error("Error logging in:", error);
            // Handle the error scenario
          }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/RegisterAdmin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });
      
            if (response.ok) {
                alert("Admin registered successfully");
                window.location.reload(false);
            } else {
                alert("Failed to register admin");
              // Handle the error scenario
            }
          } catch (error) {
            console.error("Error registering admin:", error);
            // Handle the error scenario
          }
    };
    
    return (
        <section id="login" className={`flex md:flex-row flex-col ${styles.paddingX} pt-12`}>
            <div className={`flex-1 flex ${styles.marginX} md:my-0 my-10 relative`}>
                <img src={heroml2} alt="login-icon" className="w-[100%] h-[100%] relative z-[5]" />
                {/* gradient start */}
                <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                {/* gradient end */}
            </div>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[100.8px] leading-[75px]">
                        <span className="text-gradient">Login</span>
                    </h1>
                </div>

                <form onSubmit={handleLogin}>
                {/* <form onSubmit={handleRegister}> */}
                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-md" value={username} onChange={(event) => setUsername(event.target.value)} required />
                    </div>
                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md" value={pass} onChange={(event) => setPass(event.target.value)} required />
                    </div>
                    <button type="submit" className="gap-x-10 font-poppins font-medium text-[18px] text-primary bg-blue-gradient px-4 py-2 rounded-md mt-2">Login</button>
                </form>
            </div>
        </section>

    );
};

export default Login;
