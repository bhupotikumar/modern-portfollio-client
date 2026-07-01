import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';
import publicApi from '../../api/publicApi';
import { useEffect, useState } from 'react';
import { getSocialUrl } from '../../utils/getSocialUrl';

const SocialLinks = () => {

    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);



    useEffect(() => {
        const fetchSocial = async () => {
            setLoading(true);
            try {
                const res = await publicApi.get("/api/socials");
                setSocials(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Failed to fetch social links:", err);
                setSocials([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSocial();
    }, []);


    return (
        <div className='flex flex-wrap gap-3'>
            {loading ?
                (<div className="flex justify-center md:justify-start gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden w-14 h-14 rounded-full bg-base-content/20"
                        >
                            {/* shimmer */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                            </div>
                        </div>
                    ))}
                </div>) : (
                    <div className='flex items-center gap-2'>
                        {socials.map((social) => {
                            return (
                                <AnimatedBtn
                                    key={social._id}
                                    as="a"
                                    href={getSocialUrl(social)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full w-14 h-14 p-3 text-base-content border-base-content shadow-lg shadow-base-content/50"
                                >
                                    <img
                                        src={social.logo}
                                        alt={social.platform}
                                    />
                                </AnimatedBtn>
                            );
                        })}
                    </div>
                )}
        </div>
    );
};

export default SocialLinks;