import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApi";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { RegisterTS } from "../../types";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store/store";

type Props = {};

export default function Register({}: Props) {
  const [userRegCredientials, setUserRegCredientials] = useState<RegisterTS>({
    username: "",
    email: "",
    password: "",
  });

  const changedInputsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserRegCredientials({
      ...userRegCredientials,
      [name]: value,
    });
  };
  const dispatched = useAppDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userRegCredientials.password !== userRegCredientials.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const newUserData = {
          username: userRegCredientials.username,
          email: userRegCredientials.email,
          password: userRegCredientials.password,
        };
        const res = await register(newUserData).unwrap();
        console.log("🚀 ~ submitHandler ~ res:", res);

        dispatched(
          setCredientials({
            data: res.data,
          })
        );
        navigate(redirect);
        toast.success(res.message);
      } catch (err) {
        console.log(err);
        //     toast.error(err.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter username"
              value={userRegCredientials.username}
              onChange={changedInputsHandler}
            />
          </div>

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
              className="mt-1 p-2 border rounded w-full"
              name="email"
              placeholder="Enter email"
              value={userRegCredientials.email}
              onChange={changedInputsHandler}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              name="password"
              placeholder="Enter password"
              value={userRegCredientials.password}
              onChange={changedInputsHandler}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={userRegCredientials.confirmPassword}
              onChange={changedInputsHandler}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
}
