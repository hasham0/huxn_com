import { Navigate, Outlet } from "react-router-dom";
import { RootState, useAppSelector } from "@/redux/store/store";
type Props = {};

export default function AdminRoute({}: Props) {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
}
