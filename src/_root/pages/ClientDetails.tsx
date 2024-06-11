import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetClientById, useDeleteClient } from "@/lib/react.query/queriesAndMutations";

const ClientDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const {data: client, isPending}= useGetClientById(id ?? '') ;
  const {user} = useUserContext();
  const { mutate: deleteClient } = useDeleteClient();
  console.log(client)

  const handleDeleteClient = () => {
    deleteClient({ clientId: id, imageId: client?.imageId });
    navigate(-1);
  };

  return (
    <div className = "post_details-container">
      {isPending? <Loader/>:(
        <div className = 'post_details-card'>
          <img
          src = {client?.imageUrl}
          alt = "reference images"
          className='post_details-img'
          />
          <div className="post_details-info">
            <div className='flex-between w-full'>
            <Link to={`/clients`} className ="flex items-center gap-3">
            {client?.fullName}
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular ">
                  {client?.email}
                </p>
                <p className="subtle-semibold lg:small-regular">
                  {client?.phone}
                </p>
              </div>
            </div>
            </Link>
            <div className ='flex-center gap-4'>
              <Link to = {`/edit-clients/${client?.$id}`} 
              >
              <img src = "/assets/icons/edit.png" width = {24} height = {24} alt = "edit"/>
              </Link>
              <Button
                  onClick={handleDeleteClient}
                  variant="ghost"
                  >
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className = "border w-full border-dark-4/80"/>
              <div className="flex flex-col flex-1 w-full small-medium lg: base-regular">
                <p>{client?.city}, {client?.state}, {client?.country}</p>
                <p>{client?.phoneNumber}</p>
                
        
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ClientDetails