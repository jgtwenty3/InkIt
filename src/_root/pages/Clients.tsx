import React, { useState, useEffect } from 'react';
import ClientCard from '@/components/shared/ClientCard';
import { useGetClients } from '@/lib/react.query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { Models } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Clients = () => {
    const { data: clients, isPending: isClientLoading } = useGetClients();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState<Models.Document[]>([]);
    const [filterCriterion, setFilterCriterion] = useState('fullName');

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
                client[filterCriterion]?.toLowerCase().includes(query)
            );
            setFilteredClients(filtered || []);
        }
    }, [searchQuery, filterCriterion, clients]);

    return (
        <div className="home-clients">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="filter-container">
                    <label htmlFor="filter-select" className="filter-label">Filter:</label>
                    <select
                        id="filter-select"
                        value={filterCriterion}
                        onChange={(e) => setFilterCriterion(e.target.value)}
                        className="filter-select"
                    >
                        <option value="fullName">Name</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                        <option value="country">Country</option>
                    </select>
                </div>
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
                    <li>
                        <Link to="/add-client">
                            <Button className="shad-button_primary mt-10">Add Client</Button>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Clients;

