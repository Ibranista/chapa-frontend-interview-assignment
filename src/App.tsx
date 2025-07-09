import { useEffect } from "react";
import { selectUser } from "./features/selectors/user.selector";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store/store";
import { fetchBalance } from "./features/thunk/recentTransactions.thunk";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser)?.user;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchBalance(user.id));
    }
  }, [dispatch, user?.id]);

  if (!user?.id) return <div>Loading...</div>;

  return (
    <div className="dashboard-section">
      <div>Welcome, {user?.name} ({user?.role})</div>
    </div>
  );
}

export default App;
