function Box({ children, ...props }) {
    return (
        <div className="bg-gray-200 p-4 rounded shadow-md" {...props}>
            {children}
        </div>
    );
}

export default Box;