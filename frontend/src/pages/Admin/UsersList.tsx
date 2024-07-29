import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import {
  useAllUsersQuery,
  useDeleteUserBYIDMutation,
  useUpdateProfileByIDMutation,
} from "@/redux/api/userApi";
import { UserProfileTS } from "@/types";

type Props = {};

export default function UsersList({}: Props) {
  const { data: users, refetch, isLoading, error } = useAllUsersQuery(null);

  const [deleteUser] = useDeleteUserBYIDMutation();
  const [updateUserProfile] = useUpdateProfileByIDMutation();

  const [editUserInfo, setEditUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
  });

  const changedInputsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (_id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(_id);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleEdit = (_id: string, username: string, email: string) => {
    setEditUserInfo({
      _id,
      username,
      email,
    });
  };

  const updateProfileHandler = async (userID: string) => {
    try {
      await updateUserProfile({
        _id: userID,
        username: editUserInfo.username,
        email: editUserInfo.email,
      });
      setEditUserInfo({
        _id: "",
        email: "",
        username: "",
      });
      refetch();
    } catch (err) {
      console.log("🚀 ~ updateProfileHandler ~ err:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {(error as { message: string }).message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto border-2 border-black">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2">DELETE</th>
              </tr>
            </thead>
            <tbody className="border-2 border-black">
              {users.data.map((user: UserProfileTS) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editUserInfo._id === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="username"
                          value={editUserInfo.username}
                          onChange={changedInputsHandler}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateProfileHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="ml-2"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editUserInfo._id === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          name="email"
                          value={editUserInfo.email}
                          className="w-full p-2 border rounded-lg"
                          onChange={changedInputsHandler}
                        />
                        <button
                          onClick={() => updateProfileHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="ml-2"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-2 text-center">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="flex justify-center items-center p-1">
                    {user.isAdmin ? (
                      <button className="bg-black text-white font-bold py-2 px-4 rounded">
                        <MdDoNotDisturb />
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
