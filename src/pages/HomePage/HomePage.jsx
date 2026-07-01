import React from 'react';
import Hero from '../../components/Hero/Hero';
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import Skills from '../../components/Skills/Skills';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <FeaturedProjects />
            <div className="divider my-0"></div>
            <Skills />
        </div>
    );
};

export default HomePage;
