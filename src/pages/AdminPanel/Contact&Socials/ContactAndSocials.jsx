import React from 'react';
import Tab from '../../../components/admin/Tab/Tab';
import Socials from './Socials';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const ContactAndSocials = () => {
    return (
        <Tab
            name="contact-tabs"
            tabs={[
                {
                    label: "Contact Information",
                    content: <ComingSoon />
                },
                {
                    label: "Social Media",
                    content: <Socials />
                }
            ]}
        />

    );
};

export default ContactAndSocials;