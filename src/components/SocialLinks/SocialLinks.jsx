import { FaXTwitter } from 'react-icons/fa6';
import { FiYoutube } from 'react-icons/fi';
import { ImWhatsapp } from 'react-icons/im';
import { LuFacebook } from 'react-icons/lu';
import { SlSocialInstagram, SlSocialLinkedin } from 'react-icons/sl';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';

const SocialLinks = () => {
    return (
        <div className='flex flex-wrap gap-3'>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><SlSocialLinkedin size={20} /></AnimatedBtn>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><LuFacebook size={20} /></AnimatedBtn>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><SlSocialInstagram size={20} /></AnimatedBtn>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><ImWhatsapp size={20} /></AnimatedBtn>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><FiYoutube size={20} /></AnimatedBtn>
            <AnimatedBtn className="rounded-full w-12 h-12 p-1 text-base-content border-base-content"><FaXTwitter size={20} /></AnimatedBtn>
        </div>
    );
};

export default SocialLinks;