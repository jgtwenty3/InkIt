import Loader from "@/components/shared/Loader";
import { useParams } from "react-router-dom";
import EditClientForm from "@/components/forms/EditClientForm";
import { useGetClientById } from "@/lib/react.query/queriesAndMutations";

const EditClient = () => {
  const { id } = useParams();
  console.log(id);
  const { data: client, isPending } = useGetClientById(id || '');
  console.log("client", client);

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

    return (
      <div className="flex flex-1">
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/addclient.png"
              width={24}
              height={24}
              alt="add"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Client</h2>
          </div>
  
          <EditClientForm action="Update" />
        </div>
      </div>
    );
  }


export default EditClient;
