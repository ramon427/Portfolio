import AddProject from "@/components/component/addproject.tsx";

function Collection({children}) {
    return <div>
        {children}
        <AddProject></AddProject>
    </div>
}

export default Collection;