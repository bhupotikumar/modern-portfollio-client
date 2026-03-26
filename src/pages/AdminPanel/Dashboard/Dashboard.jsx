import Clients from './Clients/Clients';
import ChatBox from './Chats/ChatBox';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-4 w-full h-[90vh]  p-2'>
            {/* Col-1 */}
            <div className="h-full flex flex-col gap-4 overflow-hidden">
                <div className="flex-1 min-h-0 flex flex-col">
                    <h1 className="pt-3 text-center font-semibold shrink-0">My Clients</h1>
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                        <Clients />
                    </div>
                </div>
                <div className="flex-1 min-h-0 flex flex-col">
                    <h1 className="text-center font-semibold shrink-0">Chat Box</h1>
                    <div className="h-full">
                        <ChatBox />
                    </div>
                </div>
            </div>

            {/* <div className="">
                <h1 className='w-full text-center font-semibold'>Recents</h1>
                <div className="w-full grid grid-rows-4">
                    <div className="">
                        <h1>Unseen Messages</h1>
                    </div>
                    <div className="">
                        <h1>Newest Blog</h1>
                    </div>
                    <div className="">
                        <h1>Newest Project</h1>
                    </div>
                    <div className="">
                        <h1>Last Chat</h1>
                    </div>
                </div>
            </div> */}

            {/* <div className=" border">
                <div className="">Total</div>
                <div className="">Most Popular
                    <div className="">Project</div>
                    <div className="">Blog</div>
                </div>
                <div className="">Encluded Socials</div>
            </div> */}

            {/* <div className="">
                <div className="">Graphs</div>
                <div className="">Analytics</div>
            </div> */}
        </div>
    );
};

export default Dashboard;