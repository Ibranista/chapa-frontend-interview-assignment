import React from "react";

const Greetings: React.FC = () => {

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 className="text-orange-200 text-2xl font-bold">Welcome to the Protected Greetings Page!</h2>
            <p className="text-9xl text-blue-200">
                Tailwind v4 works!
            </p>
            <p className='text-9xl px-28 text-orange-400 underline'>Vite + Reacst</p>
            <p className="text-5xl text-blue-200">You are authenticated and can see this page.</p>
        </div>
    );
};

export default Greetings; 