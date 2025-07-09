// the following are used to mock api data and are used inside /api/handlers.ts

export let userBalances: Record<string, number> = {
    "1": 1000,
    "2": 500,
};

export let admins = [{ id: "a1", name: "SuperAdmin" }];


export let transactions: {
    id: string;
    userId: string;
    amount: number;
    date: string;
    description: string;
}[] = [
        {
            id: "t1",
            userId: "1",
            amount: -50,
            date: "2024-06-01",
            description: "Groceries",
        },
        {
            id: "t2",
            userId: "1",
            amount: 200,
            date: "2024-05-30",
            description: "Salary",
        },
    ];

export const authUsers = [
    {
        username: "alice",
        password: "userpass",
        role: "user",
        id: "1",
        name: "Alice",
    },
    { username: "bob", password: "userpass", role: "user", id: "2", name: "Bob" },
    {
        username: "admin",
        password: "adminpass",
        role: "admin",
        id: "2",
        name: "AdminUser",
    },
    {
        username: "superadmin",
        password: "superpass",
        role: "superadmin",
        id: "3",
        name: "SuperAdmin",
    },
];