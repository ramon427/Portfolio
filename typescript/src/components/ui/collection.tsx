import AddProject from "@/components/component/addproject.tsx";

const Collection = ({ children, onProjectAdded }) => {
    return <div>
        {children}
        <AddProject onProjectAdded={onProjectAdded}></AddProject>
    </div>
}

export default Collection;