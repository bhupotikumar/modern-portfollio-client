import React, { useState } from 'react';
import publicApi from '../../api/publicApi';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import FadeUp from '../../components/Fade/FadeUp';

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
            <div className='w-11/12 my-6 md:h-[85vh] mx-auto md:flex flex-col justify-center items-center'>
                <h1 className='font-heading text-center text-xl md:text-2xl font-bold p-2 md:p-4'>
                    Contact Me
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center text-neutral gap-4 md:gap-6 p-4 md:p-6 rounded-lg shadow-lg shadow-base-content/40 w-full md:w-1/2 mx-auto'
                >
                    <input
                        name='name'
                        type="text"
                        placeholder='Your Name'
                        value={form.name}
                        required
                        className='input input-bordered border-accent w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <input
                        name='email'
                        type="email"
                        placeholder='Your Email'
                        value={form.email}
                        required
                        className='input input-bordered w-full max-w-xs border-accent focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <textarea
                        name='message'
                        placeholder='Your Message'
                        value={form.message}
                        required
                        className='textarea textarea-bordered border-accent w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary'
                        onChange={handleInputChange}
                    />

                    <button disabled={loading} className='btn btn-primary'>
                        {loading ? "Sending" : "Send Message"}
                    </button>
                </form>
                <div className="flex items-center justify-center w-full p-4 md:p-8">
                    <SocialLinks />
                </div>
            </div>
        </FadeUp>
    );
};

export default ContactPage;