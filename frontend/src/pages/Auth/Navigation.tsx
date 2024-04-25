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
  // const toggleSidebar = (): void => {
  //   setShowSidebar(!showSidebar);
  // };
  // const closeSidebar = (): void => {
  //   setShowSidebar(false);
  // };

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
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
        {/* <!-- nav items --> */}
        <nav className="flex flex-col justify-center space-y-4">
          {/* <!-- Home --> */}
          <Link
            to="/"
            className="hover:translate-x-2 flex items-center transition-transform transform"
          >
            <AiOutlineHome
              className="mr-2 mt-[3rem]"
              size={26}
            />
            <span className="hidden nav-item-name mt-[3rem] uppercase">
              home
            </span>
          </Link>
          {/* <!-- Shop --> */}
          <Link
            to="/shop"
            className="hover:translate-x-2 flex items-center transition-transform transform"
          >
            <AiOutlineShoppingCart
              className="mr-2 mt-[3rem]"
              size={26}
            />
            <span className="hidden nav-item-name mt-[3rem] uppercase">
              shop
            </span>
          </Link>
          {/* <!-- Favorite --> */}
          <Link
            to="/favorite"
            className="hover:translate-x-2 flex items-center transition-transform transform"
          >
            <FaHeart
              className="mr-2 mt-[3rem]"
              size={26}
            />
            <span className="hidden nav-item-name mt-[3rem] uppercase">
              favorite
            </span>
          </Link>
        </nav>

        {/* <!-- show user info --> */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-800f items-cente focus:outline-none flex"
          >
            {userInfo ? (
              <span className="text-white">{userInfo?.username}</span>
            ) : (
              <></>
            )}
          </button>
        </div>

        {/* <!-- login and register button --> */}
        <ul>
          <li>
            <Link
              to="/login"
              className="hover:translate-x-2 flex items-center transition-transform transform"
            >
              <AiOutlineLogin
                className="mr-2 mt-[3rem]"
                size={26}
              />
              <span className="hidden nav-item-name mt-[3rem] capitalize">
                login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:translate-x-2 flex items-center transition-transform transform"
            >
              <AiOutlineUserAdd
                className="mr-2 mt-[3rem]"
                size={26}
              />
              <span className="hidden nav-item-name mt-[3rem] capitalize">
                register
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
