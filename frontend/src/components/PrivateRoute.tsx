import { Navigate, Outlet } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store/store";
type Props = {};

export default function PrivateRoute({}: Props) {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
}
