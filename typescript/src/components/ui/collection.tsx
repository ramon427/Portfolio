import AddProject from "@/components/component/addproject.tsx";
const Collection = ({ children, onProjectAdded, isAuthenticated }) => {
    return (
        <div className="flex flex-row w-full">
            {children}
            {isAuthenticated && <AddProject onProjectAdded={onProjectAdded} />}
        </div>
    );
};

export default Collection;