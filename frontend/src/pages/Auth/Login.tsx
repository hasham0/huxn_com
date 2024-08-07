import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store/store";
import { useLoginMutation } from "../../redux/api/userApi";
import { LoginTS } from "../../types";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { userTem } from "../../lib/zod";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  const dispatched = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/profile";
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [userCredientials, setUserCredientials] = useState<LoginTS>({
    email: "",
    password: "",
  });
  const changedInputsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredientials({
      ...userCredientials,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const res = await login(userCredientials).unwrap();
      const userData = await userTem.safeParseAsync(res.data);
      if (!userData.data) {
        throw new Error("data is undefined");
      }
      dispatched(
        setCredientials({
          data: userData.data,
        }),
      );
      toast.success(res.message);
      navigate(redirect);
    } catch (err) {
      console.log("🚀  submitHandler  err:", err);
    }
  };

  return (
    <div>
      <section className="flex flex-wrap pl-[10rem]">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="mb-4 text-2xl font-semibold">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded border p-2"
                name="email"
                placeholder="Enter email"
                value={userCredientials.email}
                onChange={changedInputsHandler}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full rounded border p-2"
                placeholder="Enter password"
                value={userCredientials.password}
                onChange={changedInputsHandler}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="my-[1rem] cursor-pointer rounded bg-pink-500 px-4 py-2 text-white"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[65rem] w-[59%] rounded-lg sm:hidden md:hidden xl:block"
        />
      </section>
    </div>
  );
}
