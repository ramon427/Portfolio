import {useAuth} from "@/components/providers/AuthProvider.tsx";
import Box from "../ui/box";

function AddProject() {
    const {authToken} = useAuth();

    function handleClick() {
        
    }

    if (authToken) {
        return <Box onClick={handleClick}>+</Box>
    }

    return <></>
}

export default AddProject;