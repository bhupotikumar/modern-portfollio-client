
const Client = ({ client }) => {
    return (
        <div className='px-2 py-1 border border-base-content/20 rounded shadow-sm shadow-base-content/30'>
            <h1>{client.name}</h1>
        </div>
    );
};

export default Client;