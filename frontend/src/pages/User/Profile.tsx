import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { Link } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store/store";
import { UserProfileTS } from "../../types";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";

type Props = {};

export default function Profile({}: Props) {
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileTS>({
    _id: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const changedInputsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserProfileInfo({
      ...userProfileInfo,
      [name]: value,
    });
  };
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo?.email && userInfo?.username) {
      setUserProfileInfo((prevProfileInfo) => ({
        ...prevProfileInfo,
        email: userInfo.email,
        username: userInfo.username,
      }));
    }
  }, [userInfo]);

  const dispatched = useAppDispatch();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userProfileInfo.password !== userProfileInfo.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        if (!(userInfo && userInfo._id)) return;
        const res = await updateProfile({
          _id: userInfo && userInfo._id,
          username: userProfileInfo.username,
          email: userProfileInfo.email,
          password: userProfileInfo.password,
        }).unwrap();
        dispatched(setCredientials({ data: res.data }));
        toast.success(res.message);
      } catch (err) {
        console.log("🚀 ~ submitHandler ~ err:", err);

        // toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  name="username"
                  value={userProfileInfo.username}
                  onChange={changedInputsHandler}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  name="email"
                  value={userProfileInfo.email}
                  onChange={changedInputsHandler}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  name="password"
                  value={userProfileInfo.password}
                  onChange={changedInputsHandler}
                  required
                  minLength={5}
                  maxLength={20}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-input p-4 rounded-sm w-full"
                  name="confirmPassword"
                  value={userProfileInfo.confirmPassword}
                  onChange={changedInputsHandler}
                  required
                  minLength={5}
                  maxLength={20}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                >
                  Update
                </button>

                <Link
                  to="/user-orders"
                  className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                >
                  My Orders
                </Link>
              </div>
              {loadingUpdateProfile && <Loader />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
