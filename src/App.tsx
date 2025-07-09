import { selectUser } from "./features/selectors/user.selector";
import { useSelector } from "react-redux";
import TransactionSummaryChart from "./shared/components/charts/TransactionSummary.chart";
import RecentTransactionsChart from "./shared/components/charts/RecentTransactions.chart";

function App() {
  const user = useSelector(selectUser)?.user;

  if (!user?.id) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-2xl font-bold text-[#7dc242]">Welcome, {user?.name}!</div>
      <div className="text-gray-500 text-lg">Role: <span className="font-semibold text-[#7dc242]">{user?.role}</span></div>
      <TransactionSummaryChart />
      <RecentTransactionsChart />
    </div>
  );
}

export default App;
