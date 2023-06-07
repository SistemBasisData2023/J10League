import React from "react";

const Error = () => {
    return (
        <main className="grid min-h-full place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-white">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#home" className="rounded-md text-black bg-blue-gradient px-3.5 py-2.5 text-sm font-semibold shadow-sm">
                        Go back home
                    </a>
                </div>
            </div>
        </main>
    )
}

export default Error;