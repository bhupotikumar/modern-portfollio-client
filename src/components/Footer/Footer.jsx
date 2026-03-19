import { Link } from 'react-router';
import iconPic from '../../assets/my-icon-merged.jpg'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaLocationDot, FaMapLocation } from 'react-icons/fa6';
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
                    <nav className='flex flex-wrap text-2xl gap-3 mx-auto md:mx-0'>
                        <Link><FaLinkedin /></Link>
                        <Link><FaFacebook /></Link>
                        <Link><FaInstagram /></Link>
                        <Link><FaWhatsapp /></Link>
                        <Link><FaYoutube /></Link>
                        <Link><FaFacebook /></Link>
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