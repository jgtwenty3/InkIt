import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { ClientValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreateClient, useUpdateClient } from "@/lib/react.query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type EditClientFormProps = {
  client?:Models.Document;
  action: 'Create' | 'Update';
}

const EditClientForm = ({client, action}: EditClientFormProps) => {
  const {mutateAsync: createClient, isPending: isLoadingCreate}= useCreateClient();
  const {mutateAsync: updateClient, isPending: isLoadingUpdate}= useUpdateClient();



  const {user} = useUserContext();
  const {toast} = useToast();
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof ClientValidation>>({
    resolver: zodResolver(ClientValidation),
    defaultValues: {
      fullName: client ? client.fullName : "",
      email: client? client.email: "",
      phoneNumber: client? client.phoneNumber: "",
      city: client? client.city: "",
      state: client? client.state: "",
      country: client? client.country: "",
      file: [],
      
    },
  });
     
  async function onSubmit(values: z.infer<typeof ClientValidation>) {
    if (client && action === 'Update') {
      const updatedClient = await updateClient({
        ...values,
        clientId: client.$id,
        imageId: client.imageId,
        imageUrl: client.imageUrl,
        appointmentId: client.appointment?.id, // Use optional chaining
        messagesId: client.message?.id // Use optional chaining
      });
  
      if (!updatedClient) {
        toast({ title: 'Please Try Again' });
      } else {
        navigate(`/clients/${client.$id}`);
      }
      return;
    }
  
    const newClient = await createClient({
      ...values,
      userId: user?.id, // Assuming user is the current logged-in user
      appointmentId: client?.appointment?.id, // Use optional chaining
      messagesId: client?.message?.id // Use optional chaining
    });
  
    if (!newClient) {
      toast({ title: 'Please try again' });
    } else {
      navigate('/');
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
    className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">Client Name</FormLabel>
            <FormControl>
            <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "name"/>
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className = "shad-form_label">Email</FormLabel>
          <FormControl>
              <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "email"/>
          </FormControl>
          <FormMessage className = "shad-form_message"/>
        </FormItem>
      )}
    />
      <FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className = "shad-form_label">Phone</FormLabel>
          <FormControl>
              <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "Phone Number"/>
          </FormControl>
          <FormMessage className = "shad-form_message"/>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel className = "shad-form_label">City</FormLabel>
          <FormControl>
              <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "Brooklyn, Los Angeles, etc."/>
          </FormControl>
          <FormMessage className = "shad-form_message"/>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="state"
      render={({ field }) => (
        <FormItem>
          <FormLabel className = "shad-form_label">State</FormLabel>
          <FormControl>
              <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "NY, CA, TX, etc."/>
          </FormControl>
          <FormMessage className = "shad-form_message"/>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel className = "shad-form_label">Country</FormLabel>
          <FormControl>
              <Input
              type = "text" className = "shad-input" {...field}
              placeholder = "United States, Mexico, etc."/>
          </FormControl>
          <FormMessage className = "shad-form_message"/>
        </FormItem>
      )}
    />
    {/* <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">Client Files</FormLabel>
            <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={client?.imageUrl}
                />
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      /> */}
    
    <div className = "flex gap-4 items-center justify-end">
        <Button 
            type="button" 
            className = "shad-button_dark_4"
        >
            Cancel
        </Button>

        <Button 
        type="submit"
        className = "shad-button_primary whitespace-nowrap"
        disabled = {isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action}
        </Button>
    </div>
    </form>
  </Form>
  )
}

export default EditClientForm