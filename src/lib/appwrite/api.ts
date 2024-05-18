import { ID , Query} from "appwrite";
import { INewClient, INewUser, IUpdateClient } from "@/types";
import { account, appwriteConfig, avatars, databases, storage} from "./config"

export async function createUserAccount(user:INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name

        )
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl:avatarUrl,
        }) 

        return newUser;
        
    } catch (error) {
        console.log(error);
        return(error);
        
    }

}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
  
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  export async function signInAccount(user:{
    email:string; 
    password:string;}){
        try {
            const session = await account.createEmailSession(user.email, user.password);
            return session;
            
        } catch (error) {
            console.log(error)
        }
    }

    export async function getAccount() {
        try {
          const currentAccount = await account.get();
      
          return currentAccount;
        } catch (error) {
          console.log(error);
        }
      }

      export async function getCurrentUser() {
        try {
          const currentAccount = await getAccount();
      
          if (!currentAccount) throw Error;
      
          const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
          );
      
          if (!currentUser) throw Error;
      
          return currentUser.documents[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      
      export async function signOutAccount(){
        try {
          const session = await account.deleteSession("current");
      
          return session;
          
        } catch (error) {
          console.log(error)
        }
      }

      export async function getClients(){
        try{
          const clients = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.clientsCollectionId,
            [Query.orderDesc("fullName"), Query.limit(20)]
          );
          if(!clients) throw Error;
          
          return clients;
        } catch(error){
          console.log(error);
        }
      }

      export async function getClientById(clientId:string){
        try {
          const client = await databases.getDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.clientsCollectionId,
            clientId,
          )
          return client;
          
        } catch (error) {
          console.log(error)
        }
      }

      export async function createClient(client: INewClient) {
        // try {
        //   const uploadedFile = await uploadFile(client.file[0]);
      
        //   if (!uploadedFile) throw Error;
      
        //   const fileUrl = getFilePreview(uploadedFile.$id);
        //   if (!fileUrl) {
        //     await deleteFile(uploadedFile.$id);
        //     throw Error;
        //   }
      
      
          const newClient = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.clientsCollectionId,
            ID.unique(),
            {
              users: client.users,
              fullName: client.fullName,
              email: client.email,
              phoneNumber: client.phoneNumber,
              city: client.city,
              state: client.state,
              country: client.country,
              // imageId: uploadedFile.$id,
              
              
            }
          );
      
         
      
          return newClient;
        
      }
      export async function uploadFile(file: File) {
        try {
          const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
          );
      
          return uploadedFile;
        } catch (error) {
          console.log(error);
        }
      }
      
      export function getFilePreview(fileId: string) {
        try {
          const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
          );
      
          if (!fileUrl) throw Error;
      
          return fileUrl;
        } catch (error) {
          console.log(error);
        }
      }
      
      export async function deleteFile(fileId: string) {
        try {
          await storage.deleteFile(appwriteConfig.storageId, fileId);
      
          return { status: "ok" };
        } catch (error) {
          console.log(error);
        }
      }

      export async function updateClient(client: IUpdateClient) {
        // const hasFileToUpdate = client.file.length > 0;
      
        // try {
        //   let image = {
        //     imageUrl: client.imageUrl,
        //     imageId: client.imageId,
        //   };
      
        //   if (hasFileToUpdate) {
        //     const uploadedFile = await uploadFile(client.file[0]);
        //     if (!uploadedFile) throw Error;
      
        //     const fileUrl = getFilePreview(uploadedFile.$id);
        //     if (!fileUrl) {
        //       await deleteFile(uploadedFile.$id);
        //       throw Error;
        //     }
      
        //     image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        //   }
      
      
          const updatedClient = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.clientsCollectionId,
            client.clientId,
            {
              fullName: client.fullName,
              email: client.email,
              phoneNumber: client.phoneNumber,
              city: client.city,
              state: client.state,
              country: client.country,
              // imageId: image.imageId,
              // imageUrl: image.imageUrl,
            }
          );
      
          if (!updatedClient) {
            // if (hasFileToUpdate) {
            //   await deleteFile(image.imageId);
            // }
      
            throw Error;
          }
      
          // if (hasFileToUpdate) {
          //   await deleteFile(client.imageId);
          // }
      
          return updatedClient;
        // } catch (error) {
        //   console.log(error);
        }
      

      export  async function deleteClient(clientId:string, imageId: string){
        if(!clientId || !imageId) throw Error;
      
        try {
          await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.clientsCollectionId,
             clientId
          )
          return {status:'ok'}
        } catch (error) {
          console.log(error)
        }
      
      }
      