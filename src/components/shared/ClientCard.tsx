import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

type ClientCardProps = {
  client: Models.Document;
};

const ClientCard = ({ client }: ClientCardProps) => {
  const { user } = useUserContext();
  
  console.log('Rendering ClientCard with client:', client); // Log client data for debugging
  
  if (!client.users) {
    console.log('Client does not have a users property:', client); // Log if client.users is missing
    return null;
  }

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/edit-clients/${client.$id}`}>
            <img
                  src={
  
                    "/assets/icons/edit.png"
                  }
                  alt="edit"
                  className="w-10 lg:h-12"
                />
          </Link>
          <div className="flex flex-col">
          <Link
            to={`/clients/${client.$id}`}
            >
           <p>{client.fullName}</p>
          </Link>
            <div className="flex-center gap-2 text-light-2">
              <p className="subtle-semibold lg:small-regular">
                {client.city},
              </p>
              <p className="subtle-semibold lg:small-regular">
                {client.state},
              </p>
              <p className="subtle-semibold lg:small-regular">
                {client.country}
              </p>
            </div>
            <div className="flex flex-col">
            <p className="subtle-semibold lg:small-regular">
                Last Appointment: {client.appointment}
              </p>

            </div>
          </div>
        </div>
        <Link
          to={`/appointments/${client.appointments[0]?.$id}`} // Assuming appointments is an array and you want the first one
          className={`${user.id !== client.users.accountId && 'hidden'}`}>
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </div>
  );
};

export default ClientCard;
