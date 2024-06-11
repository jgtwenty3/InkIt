import ClientCard from '@/components/shared/ClientCard';
import { useGetClients } from '@/lib/react.query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { Models } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

const Clients = () => {
    const { user } = useUserContext();
    console.log(user);
    const { data: clients, isPending: isClientLoading } = useGetClients();
    console.log(clients);

    if (isClientLoading || !clients || !user) {
        return <Loader />;
    }
    const filteredClients = clients.documents.filter(client => client.user.email === user.email);



    return (
        <div className="home-clients">
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
        </div>
    );
};

export default Clients;