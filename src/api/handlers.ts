import { admins, authUsers, transactions, userBalances } from "@/constants/mockData";
import { http, HttpResponse } from "msw";

let users = [
  { id: "1", name: "Alice", active: true },
  { id: "2", name: "Bob", active: false },
];

function getUserName(userId: string) {
  const user = users.find((u) => u.id === userId);
  return user ? user.name : "Unknown User";
}

export const handlers = [
  // wallet
  http.get<never, never, { balance: number }>("/api/wallet", ({ request }) => {
    const userId = request.headers.get("x-user-id");
    if (!userId || !(userId in userBalances)) {
      return HttpResponse.json({ balance: 0 }, { status: 401 });
    }

    return HttpResponse.json({ balance: userBalances[userId] });
  }),
  // transactions
  http.get<never, never, typeof transactions>(
    "/api/transactions",
    ({ request }) => {
      const userId = request.headers.get("x-user-id");
      if (!userId) return HttpResponse.json([], { status: 401 });

      const userTx = transactions.filter((t) => t.userId === userId);
      return HttpResponse.json(userTx);
    }
  ),
  // transactions
  http.post<
    never,
    { amount: number; date: string; description: string },
    { success: boolean }
  >("/api/transactions", async ({ request }) => {
    const userId = request.headers.get("x-user-id");
    if (!userId || !(userId in userBalances)) {
      return HttpResponse.json({ success: false }, { status: 401 });
    }

    const body = await request.json();

    const currentBalance = userBalances[userId];
    const newBalance = currentBalance + body.amount;

    if (newBalance < 0) {
      return HttpResponse.json({ success: false }, { status: 400 });
    }

    userBalances[userId] = newBalance;

    const newTransaction = {
      id: `t${transactions.length + 1}`,
      userId,
      amount: body.amount,
      date: body.date,
      description: body.description,
    };
    transactions.push(newTransaction);

    return HttpResponse.json({ success: true });
  }),

  // users
  http.get<never, never, typeof users>("/api/users", () =>
    HttpResponse.json(users)
  ),
  // users activate
  http.patch<{ id: string }, never, { success: boolean }>(
    "/api/users/:id/activate",
    ({ params }) => {
      users = users.map((u) =>
        u.id === params.id ? { ...u, active: true } : u
      );
      return HttpResponse.json({ success: true });
    }
  ),
  // users deactivate
  http.patch<{ id: string }, never, { success: boolean }>(
    "/api/users/:id/deactivate",
    ({ params }) => {
      users = users.map((u) =>
        u.id === params.id ? { ...u, active: false } : u
      );
      return HttpResponse.json({ success: true });
    }
  ),
  // user payments
  http.get<never, never, { userId: string; total: number }[]>(
    "/api/user-payments",
    () =>
      HttpResponse.json([
        { userId: "1", total: 500 },
        { userId: "2", total: 300 },
      ])
  ),
  // admin payments summary
  http.get<
    never,
    never,
    { userId: string; userName: string; amount: number; date: string }[]
  >("/api/admins/payments-summary", () => {
    const summaries = transactions.map((tx) => ({
      userId: tx.id,
      userName: "Unknown",
      amount: tx.amount,
      date: tx.date,
    }));

    return HttpResponse.json(summaries);
  }),
  // superadmin payments summary
  http.get<
    never,
    never,
    {
      userId: string;
      userName: string;
      totalPayments: number;
      lastPaymentDate: string;
    }[]
  >("/api/superadmin/payments-summary", () => {

    const paymentData: Record<string, { total: number; lastDate: string }> = {};

    for (const payment of [
      { userId: "1", total: 500, lastDate: "2024-06-01" },
      { userId: "2", total: 300, lastDate: "2024-05-30" },
    ]) {
      paymentData[payment.userId] = {
        total: payment.total,
        lastDate: payment.lastDate,
      };
    }
    const result = Object.entries(paymentData).map(([userId, data]) => ({
      userId,
      userName: getUserName(userId),
      totalPayments: data.total,
      lastPaymentDate: data.lastDate,
    }));

    return HttpResponse.json(result);
  }),
  // admins create
  http.post<
    never,
    { name: string; username: string; password: string },
    { id: string; name: string }
  >("/api/admins", async ({ request }) => {
    const { name, username, password } = await request.json();

    const newAdmin = { id: `a${admins.length + 1}`, name };
    admins.push(newAdmin);

    authUsers.push({
      id: newAdmin.id,
      name,
      username,
      password,
      role: "admin",
    });

    return HttpResponse.json(newAdmin);
  }),
  // admins delete
  http.delete<{ id: string }, never, { success: boolean }>(
    "/api/admins/:id",
    ({ params }) => {
      admins.push(...admins.filter((a) => a.id !== params.id));
      return HttpResponse.json({ success: true });
    }
  ),
  // system stats
  http.get<
    never,
    never,
    { totalPayments: number; activeUsers: number; totalUsers: number }
  >("/api/system-stats", () =>
    HttpResponse.json({
      totalPayments: 800,
      activeUsers: users.filter((u) => u.active).length,
      totalUsers: users.length,
    })
  ),

  // login
  http.post<
    never,
    { username: string; password: string },
    | { user: { id: string; name: string; role: string }; token: string }
    | { error: string }
  >("/api/login", async ({ request }) => {
    const { username, password } = await request.json();
    const found = authUsers.find((u) => u.username === username);
    if (!found || found.password !== password) {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    return HttpResponse.json({
      user: { id: found.id, name: found.name, role: found.role },
      token: `mock-token-${found.role}`,
    });
  }),
  // logout
  http.post<never, never, { success: boolean }>("/api/logout", () =>
    HttpResponse.json({ success: true })
  ),
];
