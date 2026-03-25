import SocialLinks from '../SocialLinks/SocialLinks';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';
import TypingText from '../TypingText/TypingText';
import useUser from '../../hooks/useUser';

const Hero = () => {
    const { user, loading } = useUser();
    const { name, title, photo, description, intro } = user || {};
    return (

        <div className="card card-sm bg-base-200 md:flex-row items-center max-h-[90vh] overflow-hidden gap-6">
            <figure className="hover-gallery w-full md:w-1/2">
                <img className='w-full h-full object-cover' src={photo} />
                <img className='w-full h-full object-cover' src={intro} />
            </figure>
            <div className="card-body">
                <div className='text-center md:text-left text-base-content'>
                    <h1 className="allura-regular text-2xl md:text-5xl lg:text-6xl font-bold">Hi !</h1>
                    <h1 className="primary-font text-xl md:text-2xl lg:text-7xl font-bold my-2">
                        I'm <span className='text-primary'><TypingText text={loading ? "" : name?.name} speed={70} /></span>
                    </h1>
                    <span className="pt-6 text-base md:text-2xl font-bold">
                        {loading ? "" : title?.title}
                    </span>
                    <div className="divider"></div>
                    <p className="pt-12 pb-6 md:text-lg">
                        {loading ? "" : description?.description}
                    </p>
                    <div className="mb-8">
                        <AnimatedBtn
                            className="border-r-0 rounded-r-none text-primary"
                            onClick={() => alert("Clicked!")}>
                            Download CV
                        </AnimatedBtn>
                        <AnimatedBtn
                            className="border-l-0 rounded-l-none text-base"
                            direction="rtl"
                            onClick={() => alert("Clicked!")}>
                            Hire Me
                        </AnimatedBtn>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;