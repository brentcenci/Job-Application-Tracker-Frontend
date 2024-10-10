const Dash = () => {
    return(
        <>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:grid-rows-8 gap-6">

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
                        <div className="text-2xl font-semibold mb-1">2</div>
                        <div className="text-sm font-medium text-gray-400">Users</div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
                        <div className="text-2xl font-semibold mb-1">2</div>
                        <div className="text-sm font-medium text-gray-400">Users</div>
                    </div>


                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
                        <div className="text-2xl font-semibold mb-1">100</div>
                        <div className="text-sm font-medium text-gray-400">Companies</div>
                    </div>


                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
                        <div className="text-2xl font-semibold mb-1">100</div>
                        <div className="text-sm font-medium text-gray-400">Blogs</div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md lg:col-span-2">
                        <div className="text-2xl font-semibold mb-1">Special Box</div>
                        <div className="text-sm font-medium text-gray-400">This box spans two columns</div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
                        <div className="text-2xl font-semibold mb-1">100</div>
                        <div className="text-sm font-medium text-gray-400">Companies</div>
                    </div>

                    <div
                        className="bg-white rounded-md border border-gray-100 p-6 shadow-md lg:col-span-2 lg:row-span-2">
                        <div className="text-2xl font-semibold mb-1">2x2 Box</div>
                        <div className="text-sm font-medium text-gray-400">Spans 2 columns and 2 rows</div>
                    </div>

                    <div
                        className="bg-white rounded-md border border-gray-100 p-6 shadow-md xl:col-span-4 xl:row-span-4">
                        <div className="text-2xl font-semibold mb-1">4x4 Box</div>
                        <div className="text-sm font-medium text-gray-400">Spans 4 columns and 4 rows</div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Dash;