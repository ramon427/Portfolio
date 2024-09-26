import {Header} from "@/components/component/header.tsx";
import ProjectList from "@/components/component/projectlist.tsx";
import About from "@/components/component/about.tsx";

function Default() {
    return (
        <>
            <Header></Header>

            <About></About>

            <ProjectList></ProjectList>
        </>
    )
}

export default Default;