import React from 'react';
import Hero from '../../components/Hero/Hero';
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import Skills from '../../components/Skills/Skills';
import { Divider } from '../../components/Divider/Divider';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <FeaturedProjects />
            <Divider />
            <Skills />
        </div>
    );
};

export default HomePage;
