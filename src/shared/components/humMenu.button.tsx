import React, { useState } from "react";

const HumMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div
            className="w-8 h-6 flex flex-col justify-between cursor-pointer"
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    toggleMenu();
                }
            }}
        >
            <span
                className={`block h-1.5 w-full bg-black rounded transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
            />
            <span
                className={`block h-1.5 w-full bg-black rounded transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                    }`}
            />
            <span
                className={`block h-1.5 w-full bg-black rounded transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
            />
        </div>
    );
};

export default HumMenu;
