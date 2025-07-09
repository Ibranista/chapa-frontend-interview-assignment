import { FaHandHolding, FaMoneyBill, FaMoneyBillWave, FaSignOutAlt, FaToolbox, FaUser } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

export const Links = (role: string) => [
    {
        name: "Dashboard",
        path: "/",
        icon: <LuLayoutDashboard />,
    },
    ...(role === "superadmin"
        ? [{
            name: "Management",
            path: "/manage-users",
            icon: <FaToolbox />
        }]
        : []),
    {
        name: "Greetings",
        path: "/greetings",
        icon: <FaHandHolding />,
    },
    {
        name: "Users",
        path: "/users",
        icon: <FaUser />,
    },
    ...(role === "superadmin" || role === "admin" ? [{
        name: "Transaction",
        path: "/transaction-summary",
        icon: <FaMoneyBill />,
    }] : []),
    ...(role === "user"
        ? [{
            name: "Initiate Transaction",
            path: "/initiate-transaction",
            icon: <FaMoneyBillWave />
        },
        {
            name: "Transactions",
            path: "/recent-transactions",
            icon: <FaMoneyBillWave />
        }
        ]
        : []),
    {
        name: "Logout",
        path: "/logout",
        icon: <FaSignOutAlt />
    }
];