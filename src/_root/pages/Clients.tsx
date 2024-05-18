import ClientCard from '@/components/shared/ClientCard';
import { useGetClients } from '@/lib/react.query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { Models } from 'appwrite';

const Clients = () => {
    const { data: clients, isPending: isClientLoading } = useGetClients();

    console.log('Clients data:', clients); // Log the clients data for debugging
    console.log('isClientLoading:', isClientLoading); // Log the loading state for debugging

    return (
        <div className="home-clients">
            {isClientLoading && !clients ? (
                <Loader />
            ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full">
                    {clients?.documents.map((client: Models.Document) => (
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
