import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/NavStyle.css";
import {
  useAppSelector,
  useAppDispatch,
  RootState,
} from "../../redux/store/store";
import { useLogoutMutation } from "../../redux/api/userApi";
import { logout } from "../../redux/features/auth/authSlice";
export default function Navigation() {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const dispatched = useAppDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = (): void => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = (): void => {
    setShowSidebar(false);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {
    try {
      await logoutApiCall(null).unwrap();
      dispatched(logout());
      navigate("/login");
    } catch (error) {
      console.log("🚀  logoutHandler  error:", error);
    }
  };

  return (
    <>
      <section
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } fixed h-[100vh] w-[4%] flex-col justify-between bg-[#000] p-4 text-white hover:w-[15%] sm:hidden md:hidden lg:flex xl:flex`}
        id="navigation-container"
      >
        {/* <!-- nav items --> */}
        <nav className="flex flex-col justify-center space-y-4">
          {/* <!-- Home --> */}
          <Link
            to="/"
            className="flex transform items-center transition-transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="nav-item-name mt-[3rem] hidden uppercase">
              home
            </span>
          </Link>
          {/* <!-- Shop --> */}
          <Link
            to="/shop"
            className="flex transform items-center transition-transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
            <span className="nav-item-name mt-[3rem] hidden uppercase">
              shop
            </span>
          </Link>
          {/* <!-- Favorite --> */}
          <Link
            to="/favorite"
            className="flex transform items-center transition-transform hover:translate-x-2"
          >
            <FaHeart className="mr-2 mt-[3rem]" size={26} />
            <span className="nav-item-name mt-[3rem] hidden uppercase">
              favorite
            </span>
          </Link>
        </nav>

        {/* <!-- show user info --> */}
        {userInfo && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-800f items-cente flex focus:outline-none"
            >
              {userInfo && (
                <span className="text-white">{userInfo?.username}</span>
              )}
              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 ${
                    dropdownOpen ? "rotate-180 transform" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              )}
            </button>
            {dropdownOpen && userInfo && (
              <ul
                className={`absolute right-0 mr-14 mt-2 space-y-2 bg-white text-gray-600 ${
                  !userInfo.isAdmin ? "-top-20" : "-top-80"
                } `}
              >
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/allproductslist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* <!-- login and register button --> */}
        {!userInfo && (
          <>
            <ul>
              <li>
                <Link
                  to="/login"
                  className="flex transform items-center transition-transform hover:translate-x-2"
                >
                  <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                  <span className="nav-item-name mt-[3rem] hidden capitalize">
                    login
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex transform items-center transition-transform hover:translate-x-2"
                >
                  <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                  <span className="nav-item-name mt-[3rem] hidden capitalize">
                    register
                  </span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </section>
    </>
  );
}
