import Clients from './Clients/Clients';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-4 w-full h-[90vh] overflow-hidden'>
            {/* Messages */}
            <div className="h-[90vh] col-span-2 flex flex-col p-2 gap-6">
                <div className="h-1/2 border border-base-300 rounded-lg shadow-lg shadow-base-content/30 overflow-auto p-2">
                    <Clients />
                </div>
                <div className="h-1/2 border border-base-content/30 rounded-xl shadow-lg shadow-base-content/30 overflow-hidden">
                    {/* <ChatBox conversationId="public-chat-1" /> */}
                </div>
            </div>
            {/* </div> */}

            {/* col 2 */}
            <div className="p-2">
                <div className="w-full h-full grid grid-row-4 gap-8">
                    <div className="h-full rounded-xl border border-base-content/30 shadow-lg shadow-base-content/30 p-2">
                        <h1 className='font-bold mb-2'>Newest Projects</h1>
                        <div className="ml-4">
                        </div>
                    </div>
                    <div className="h-full rounded-xl border border-base-content/30 shadow-lg shadow-base-content/30 p-2">
                        <h1>Last Chats</h1>
                        <div className="ml-4">
                        </div>
                    </div>
                </div>
            </div>

            {/* Col 3 */}
            <div className="col-span-2">
                <div className="h-full grid grid-rows-2 gap-6">
                    <div className="grid grid-cols-4 gap-6">
                        {/* Graph */}
                        <div className="col-span-3 p-2">
                            <div className="h-full border"></div>
                        </div>
                        {/* Total */}
                        <div className="p-2">
                            <div className="h-full border"></div>
                        </div>
                    </div>

                    <div className="h-full grid grid-cols-2 gap-6 p-2">
                        <div className="h-full grid grid-rows-2 gap-6">
                            {/* Most popular Project */}
                            <div className="">
                                <div className="h-full border"></div>
                            </div>

                            {/* Most popular Blogs */}
                            <div className="border">

                            </div>
                        </div>
                        {/* Extra Section */}
                        <div className="border">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;