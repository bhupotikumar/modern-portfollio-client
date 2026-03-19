import React from 'react';
import image from '../../assets/my-icon-merged.jpg'
import Hero from '../../components/Hero/Hero';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <img src={image} alt="" />
        </div>
    );
};

export default HomePage;