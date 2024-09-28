import AddProject from "@/components/component/addproject.tsx";
import React from "react";
const Collection = ({ children, onProjectAdded, isAuthenticated }) => {
    return (
        <div className="flex flex-row w-full gap-4 flex-wrap justify-start">
            {React.Children.map(children, (child) => (
                <div className="w-[calc(33%-16px)] max-w-sm flex-grow-0 flex-shrink">
                    {child}
                </div>
            ))}
            {isAuthenticated && <div className="w-[calc(33%-16px)] max-w-sm flex-grow-0 flex-shrink">
                <AddProject onProjectAdded={onProjectAdded}/>
            </div>}
        </div>
    );
};

export default Collection;