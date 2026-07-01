import SocialLinks from '../SocialLinks/SocialLinks';
import useUser from '../../hooks/useUser';
import Navbar from '../Header/Navbar';
import FooterSkeleton from '../Skeleton/FooterSkeleton';
const Footer = () => {

    const { user, loading } = useUser();

    if (loading || !user) {
        return (
            <FooterSkeleton />
        );
    }

    return (
        <footer>
            <div className="footer sm:footer-horizontal text-base-content p-4 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between bg-base-content/5 gap-2">
                <aside className='text-center md:text-left md:gap-4'>
                    <div className='font-bold text-xl md:text-2xl w-full md:w-auto'>
                        <h1 className=''>{user?.name?.name || "Name not available"}</h1>
                        <p className='text-sm md:text-base font-normal'>{user?.title?.title || "Title not available"}</p>
                    </div>
                    <div className="max-w-md text-lg text-base-content/80">
                        <span>{user?.description?.description || "Description not available"}</span>
                    </div>
                    <div className="w-full md:w-auto mt-2 md:mt-4 flex justify-center items-center">
                        <SocialLinks />
                    </div>
                </aside>
                <figure className='w-32 h-32 md:w-72 md:h-72 border rounded-full overflow-hidden'>
                    <img
                        className='w-full h-full object-cover'
                        src={user?.photo || "/placeholder.jpg"}
                        alt={user?.name?.name || "Name not available"} />
                </figure>

            </div>

            <div className="footer sm:footer-horizontal footer-center text-gray-200 p-4 bg-gray-800 border-t border-gray-400">
                <aside>
                    <p className='text-xs md:text-base'>© {new Date().getFullYear()} - All right reserved by {user?.name?.name || "Name not available"}.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;