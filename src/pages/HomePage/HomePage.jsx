import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import Hero from '../../components/Hero/Hero';
import Skills from '../../components/Skills/Skills';
import ChatBox from '../Chats/ChatBox';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <Skills />
            <div className="divider"></div>
            <FeaturedProjects />
        </div>
    );
};

export default HomePage;