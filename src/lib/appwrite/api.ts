import { account, appwriteconfig } from './config';
import { INewPost, INewUser, IUpdatePost} from "@/types";
import {avatars} from './config';
import {databases} from './config';
import {storage} from './config';
import { ID, Query } from 'appwrite';
import { ImageGravity } from 'appwrite';



export async function createUserAccount(user: INewUser) {

    try{
        const newAccount= await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount) throw Error;

        //const avatarUrl = avatars.getInitials(user.name);
        const avatarUrl = new URL(avatars.getInitials(user.name));

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        }) 

        return newUser;
    }

    catch(error){
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL; //If there are issues, change to 'string'
    username?: string;
}){
    try {
        const newUser = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    }
    catch (error) {
        console.log(error);
    }

}

export async function signInAccount(user: {email: string; password: string}){
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;
    }   
    catch (error){
        console.log(error);
    }
}

export async function getCurrentUser(){
    try{
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error; 

        const currentUser = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw new Error;

        return currentUser.documents[0];
    }
    catch (error){
        console.log(error);
    }
}

export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current");

        return session;
    }   
    catch (error){
        console.log(error);
    }
}

export async function createPost(post: INewPost){
    try {
        //upload the image to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        // get file url
        const fileUrl = getFilePreview(uploadedFile.$id)

        if(!fileUrl){
            deleteFile(uploadedFile.$id)
            throw Error;
        }

        // convert tags to array
        const tags= post.tags?.replace(/ /g, '').split(',') || [];

        // save to database
        const newPost = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if(!newPost){
            await deleteFile(uploadedFile.$id)
            throw Error;
        }
        return newPost;

    } catch (error) {
        console.log(error)
    }
}

export async function uploadFile(file: File){
    try {
        const uploadedFile = await storage.createFile(
            appwriteconfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log(error)
    }
}

export async function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteconfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100,
        )
        return fileUrl;
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFile(fileId: string){
    try {
        await storage.deleteFile(appwriteconfig.storageId, fileId);
        
        return { status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}

export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        //image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }; //DO NOT DELETE WILL NEED LATER
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await databases.updateDocument(
        appwriteconfig.databaseId,
        appwriteconfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error;

    return posts

}