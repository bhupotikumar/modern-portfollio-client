import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import Hero from '../../components/Hero/Hero';
import Skills from '../../components/Skills/Skills';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <Skills />
            <div className="divider my-0"></div>
            <FeaturedProjects />
        </div>
    );
};

export default HomePage;