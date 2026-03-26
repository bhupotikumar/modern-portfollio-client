import { useEffect, useState } from 'react';
import Client from './Client';

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch("/clients.json");
                const data = await res.json();

                setClients(data.clients);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="flex flex-col gap-y-3">
            {clients.map(client => (
                <Client key={client.id} client={client} />
            ))}
        </div>
    );
};

export default Clients;