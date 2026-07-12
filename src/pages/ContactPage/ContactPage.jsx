import React, { useState } from 'react';
import publicApi from '../../api/publicApi';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import FadeUp from '../../components/Fade/FadeUp';
import { Divider } from '../../components/Divider/Divider';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async () => {
        try {
            setLoading(true);

            const res = await publicApi.post("/api/contact-messages", form);

            console.log("Message sent", res.data);

            setForm({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <FadeUp>
            <div className='p-4 h-screen flex flex-col justify-center items-center'>
                <h1 className='font-heading text-accent text-center text-xl md:text-2xl font-bold p-4 md:p-4'>
                    Contact Me
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center bg-base-200 gap-6 p-12 rounded-lg shadow-lg shadow-base-content/60 w-full md:w-1/2 mx-auto mb-6'
                >
                    <input
                        name='name'
                        type="text"
                        placeholder='Your Name'
                        value={form.name}
                        required
                        className='input input-bordered border-base-content w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <input
                        name='email'
                        type="email"
                        placeholder='Your Email'
                        value={form.email}
                        required
                        className='input input-bordered w-full max-w-xs border-base-content focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <textarea
                        name='message'
                        placeholder='Your Message'
                        value={form.message}
                        required
                        className='textarea textarea-bordered border-base-content w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <button disabled={loading} className='btn btn-secondary'>
                        {loading ? "Sending" : "Send Message"}
                    </button>
                </form>
                <div className="flex items-center justify-center w-full p-4 md:p-8">
                    <SocialLinks />
                </div>
            </div>
            <Divider />
        </FadeUp>
    );
};

export default ContactPage;