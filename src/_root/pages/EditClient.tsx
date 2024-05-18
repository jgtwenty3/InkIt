import Loader from "@/components/shared/Loader";
import { useParams } from "react-router-dom";
import EditClientForm from "@/components/forms/EditClientForm";
import { useGetClientById } from "@/lib/react.query/queriesAndMutations";


const EditClient = () => {
  const {id} = useParams();
  console.log(id)
  const {data:client, isPending} = useGetClientById(id || '');
  console.log("client", client)
  
  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className = "flex flex-1">
      <div className = "common-container">
        <div className = "flex-start gap-3 justify-start w-full max-w-5xl">

        </div>
      </div>
      {isPending ? <Loader /> : <EditClientForm action="Update" client={client} />}

    </div>
  )
}

export default EditClient