import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

const SocialLinks = () => {
    return (
        <div className='flex flex-wrap text-2xl gap-3'>
            <Link><FaLinkedin /></Link>
            <Link><FaFacebook /></Link>
            <Link><FaInstagram /></Link>
            <Link><FaWhatsapp /></Link>
            <Link><FaYoutube /></Link>
            <Link><FaFacebook /></Link>
        </div>
    );
};

export default SocialLinks;