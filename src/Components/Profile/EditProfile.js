import { 
    Button, 
    FormControl, 
    FormLabel, 
    HStack, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay 
} from "@chakra-ui/react";
import { useAuth } from "../../Hooks/Auth";
import { useUpdateAvatar } from "../../Hooks/Users";
import Avatar from "./Avatar";

export default function EditProfile({isOpen, onClose}) {
    const {user, isLoading: authLoading} = useAuth();
    const {setFile, updateAvatar, isLoading: fileLoading, fileURL} = useUpdateAvatar(user?.id);
    
    function handleChange(e){
        setFile(e.target.files[0])
    }

    if(authLoading) return "Loading...";
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton avatar />
                <ModalBody>
                    <HStack spacing="5">
                        <Avatar user={user} overrideAvatar={fileURL} />
                        <FormControl py="4">
                            <FormLabel htmlFor="picture">Change Avatar</FormLabel>
                            <input type="file" accept="image/*" onChange={handleChange}/>
                        </FormControl>
                    </HStack>
                    <Button
                        loadingText="Uploading..."
                        w="full"
                        my="6"
                        colorScheme="blue"
                        onClick={updateAvatar}
                        isLoading={fileLoading}
                    >Save
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
)}
