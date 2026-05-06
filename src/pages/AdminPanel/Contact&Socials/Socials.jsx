import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import ItemCard from '../../../components/admin/ItemCard/ItemCard';
import AddSocial from './AddSocial';
import EditSocial from './EditSocial';
import DeleteConfirm from '../../../components/admin/DeleteConfirm/DeleteConfirm';

const Socials = () => {

    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSocial, setSelectedSocial] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        // Fetch socials data from API
        const fetchSocials = async () => {
            setLoading(true);
            try {
                // Replace with your actual API call
                const response = await api.get('/api/socials');
                setSocials(response.data || []);
            } catch (error) {
                console.error('Failed to fetch socials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSocials();
    }, []);




    const handleAddSocial = async (formData) => {
        try {
            const response = await api.post('/api/socials', formData);
            console.log('Social added:', response.data);
            setSocials([...socials, response.data]);
        } catch (error) {
            console.error('Failed to add social:', error);
        }
    };



    const handleEdit = (social) => {
        setSelectedSocial(social);
        setIsEditOpen(true);
    };

    const handleDeleteClick = (social) => {
        setSelectedSocial(social);
        setIsDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/socials/${selectedSocial._id}`);
            setSocials(prev =>
                prev.filter(s => s._id !== selectedSocial._id)
            );
            setIsDeleteOpen(false);
            setSelectedSocial(null);
        } catch (error) {
            console.error('Failed to delete social:', error);
        }
    };


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <AddSocial onsubmit={handleAddSocial} />
            )}
            {socials.length > 0 ? (
                <ul>
                    {socials.map((social, index) => (
                        <ItemCard
                            key={index}
                            title={social.platform}
                            description={social.url}
                            updatedAt={social.updatedAt}
                            onEdit={() => handleEdit(social)}
                            onDelete={() => handleDeleteClick(social)}
                        />


                    ))}
                    <EditSocial
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        social={selectedSocial}
                        onUpdate={(updatedSocial) => {
                            setSocials(socials.map((s) => (s._id === updatedSocial._id ? updatedSocial : s)));
                        }}
                    />
                    <DeleteConfirm
                        isOpen={isDeleteOpen}
                        onClose={() => setIsDeleteOpen(false)}
                        onConfirm={handleDeleteConfirm}
                        message={`Are you sure you want to delete ${selectedSocial?.platform}?`}
                    />

                </ul>
            ) : (
                <p>No social media links available.</p>
            )}
        </div>
    );
};

export default Socials;