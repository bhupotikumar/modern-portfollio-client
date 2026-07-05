import React from 'react';

const Tab = ({ tabs = [], name = "tabs" }) => {
    return (
        <div className="tabs tabs-lift bg-base-100 rounded-xl p-2">
            {tabs.map((tabs, index) => (
                <React.Fragment key={index}>
                    <input
                        type="radio"
                        name={name}
                        className="tab text-primary-content text-base font-semibold"
                        aria-label={tabs.label}
                        defaultChecked={index === 0}
                    />
                    <div className="tab-content bg-base-100 border border-base-content p-6 max-h-[80vh] overflow-auto">
                        {tabs.content}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Tab;