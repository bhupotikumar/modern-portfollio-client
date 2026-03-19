import React from 'react';

const Hero = () => {
    return (

        <div className="card card-sm bg-base-200 md:flex-row items-center">
            <figure className="hover-gallery max-w-screen md:max-w-1/2 lg:max-w-1/3">
                <img src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
                <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
                <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
                <img src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
            </figure>
            <div className="card-body">
                <div className='text-center lg:text-left'>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Hi!</h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">I'm Bhupoti Kumar Roy.</h1>
                    <span className="py-6 text-base md:text-xl">
                        Frontend Developer
                    </span>
                    <p className="py-6">
                        I build modern, responsive, and user-friendly web applications using React, Tailwind, Firebase, Express, MongoDB.
                    </p>
                    <button className="btn btn-primary">Download CV</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;