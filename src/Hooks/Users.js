import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/Firebase";
import {query, doc, updateDoc} from "firebase/firestore";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id){
    const q = query(doc(db, 'users', id));
    const [user, isLoading] = useDocumentData(q);
    
    return{user, isLoading};
}

export function useUpdateAvatar(uid){
    const [isLoading, setLoading]=useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const toast=useToast();

    async function updateAvatar(){
        if(!file){
            toast({
                title:"No file selected",
                description: "Please select a file to upload",
                status: "error",
                duration: 5000,
                isClosable:true,
                position:"top",
            });
            return;
        }
        setLoading(true);

        const fileRef = ref(storage, "avatars/" + uid);
        await uploadBytes(fileRef, file);
        const avatarURL = await getDownloadURL(fileRef);
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {avatar: avatarURL});

        toast({
            title: "picture updated",
            status: "success",
            isClosable: true,
            position:"top",
            duration: 5000
        })
        setLoading(false);
        navigate(0);
    }

    return {setFile, updateAvatar, isLoading, fileURL: file && URL.createObjectURL(file)}
}