import React, { useState, useEffect } from 'react';
import ClientCard from '@/components/shared/ClientCard';
import { useGetClients } from '@/lib/react.query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { Models } from 'appwrite';

const Clients = () => {
    const { data: clients, isPending: isClientLoading } = useGetClients();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState<Models.Document[]>([]);

    useEffect(() => {
        if (clients?.documents) {
            setFilteredClients(clients.documents);
        }
    }, [clients]);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredClients(clients?.documents || []);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = clients?.documents.filter((client: Models.Document) => 
                client.fullName.toLowerCase().includes(query) || 
                client.city.toLowerCase().includes(query) || 
                client.state.toLowerCase().includes(query) || 
                client.country.toLowerCase().includes(query)
            );
            setFilteredClients(filtered || []);
        }
    }, [searchQuery, clients]);

    return (
        <div className="home-clients">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search name or loc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            {isClientLoading && !clients ? (
                <Loader />
            ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full">
                    {filteredClients.map((client: Models.Document) => (
                        <li key={client.$id}>
                            <ClientCard client={client} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Clients;
