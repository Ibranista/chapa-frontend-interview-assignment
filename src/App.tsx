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
    <div className="">
      <div className="text-2xl font-bold text-[#7dc242]">Welcome, {user?.name}!</div>
      <div className="text-gray-500 text-lg">Role: <span className="font-semibold text-[#7dc242]">{user?.role}</span></div>
    </div>
  );
}

export default App;
