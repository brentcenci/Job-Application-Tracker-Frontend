const Loading = () => {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm overflow-y-auto">
                Loading
            </div>
        </div>
    );
};

export default Loading;