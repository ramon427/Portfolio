import AddProject from "@/components/component/addproject.tsx";

const Collection = ({ children, onProjectAdded }) => {
    return <div className="flex flex-row w-full">
        {children}
        <AddProject onProjectAdded={onProjectAdded}></AddProject>
    </div>
}

export default Collection;