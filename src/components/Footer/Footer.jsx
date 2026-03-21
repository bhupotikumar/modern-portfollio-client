import iconPic from '../../assets/my-icon-merged.jpg'
import { FaLocationDot } from 'react-icons/fa6';
import SocialLinks from '../SocialLinks/SocialLinks';
const Footer = () => {
    return (
        <footer>
            <div className="footer sm:footer-horizontal text-gray-200 p-10 flex flex-col-reverse md:flex-row items-center justify-between bg-gray-800 gap-2">
                <aside className='text-center md:text-left gap-4'>
                    <p className='font-bold text-xl md:text-2xl'>
                        Bhupoti Kumar Roy
                        <br />
                        <span className='text-sm md:text-base font-normal'>Frontend Developer building modern web experiences.</span>
                    </p>
                    <div className="divider"></div>
                    <nav className='mx-auto md:mx-0'>
                        <SocialLinks />
                    </nav>
                    <div className="flex items-center gap-2 mx-auto md:mx-0">
                        <FaLocationDot />
                        <span>Lalmonirhat, Rangpur, BD</span>
                    </div>
                </aside>
                <figure className='w-32 h-32 md:w-72 md:h-72 border rounded-full overflow-hidden'>
                    <img className='w-full h-full object-cover' src={iconPic} alt="Bhupoti Kumar Roy's Photo" />
                </figure>

            </div>

            <div className="footer sm:footer-horizontal footer-center text-gray-200 p-4 bg-gray-800 border-t border-gray-400">
                <aside>
                    <p className='text-xs md:text-base'>© {new Date().getFullYear()} - All right reserved by Bhupoti Kumar Roy.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;