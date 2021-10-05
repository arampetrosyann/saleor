import React, { useState } from "react";
import Link from "next/link";
import { useAuthState } from "@saleor/sdk";
import { ShoppingBagIcon, UserCircleIcon, XIcon } from "@heroicons/react/outline";
import { useLocalStorage, useWindowSize } from "react-use";
import { useAuth } from "@saleor/sdk";
import { Icon } from "@/components/Icon";
import { useCheckoutByTokenQuery } from "@/saleor/api";
import { CHECKOUT_TOKEN } from "@/lib/const";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { Button } from "@/components/Button";
import { AuthModalContext } from "@/context/authModalContext";
import { SignIn } from "./account/SignIn";
import { SignUp } from "./account/SignUp";
import { Modal } from "./Modal";
import { Menu } from "./Menu";

export const Navbar: React.VFC = ({}) => {
  const [checkoutToken, setCheckoutToken] = useLocalStorage(CHECKOUT_TOKEN);
  const [modalType, setModalType] = useState("signIn");
  const [openModal, setOpenModal] = useState(false);
  const { width } = useWindowSize();
  const { logout } = useAuth();
  const router = useRouter();
  const client = useApolloClient();
  const { authenticated, user } = useAuthState();
  const { data } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken
  });

  const onLogout = async () => {
    // clear all the user data on logout
    await logout();
    await setCheckoutToken("");
    await client.resetStore();
    router.push("/");
  };
  const counter = data?.checkout?.lines?.length || 0;

  return (
    <AuthModalContext.Provider value={{ openModal, setOpenModal, modalType, setModalType }}>
    <div className="bg-white shadow-sm  mx-auto border-b-2 border-header ">
      <div className="max-w-page mx-auto shadow-sm px-auto py-page-y px-page-x">
        <div className="flex justify-between items-center min-xl:pr-15px">
          <div className="min-w-169 max-md:min-w-153">
            <Link href={"/"}>
              <a>
                <img className={"block max-h-logo h-auto w-auto"} src="/static/logo.png" alt="" />
              </a>
            </Link>
          </div>
          {width > 1170 &&
          <div className={"w-full mx-52 max-xl:mx-15"}>
            <Menu />
          </div>
          }
          <div>
            <div className="grid grid-flow-col gap-x-6 items-center">
              <div>
                <Icon size={20} name={"search"} />
              </div>
              <Link href="/cart">
                <a>
                  <span className={"relative"}>
                  <Icon size={20} name={"bag"} />
                  <span className="absolute ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {counter}
                  </span>
                    </span>
                </a>
              </Link>
              {width > 768 ?
                <>
                  <div>
                    <Icon size={20} name={"like"} />
                  </div>
                  {!authenticated && (
                      <span className="group -m-2 p-2 flex items-center">
                        <Button className="bg-black uppercase" onClick={() => { setModalType("signIn"); setOpenModal(true); }}>Sign In</Button>
                      </span>
                  )}
                  {authenticated && (
                    <div className="group -m-2 p-2  text-left dropdown flex items-center z-40">
                <span className="rounded-md shadow-sm">
                <button
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                  aria-controls="headlessui-menu-items-117"
                >
                <a className="group -m-2 p-2 flex items-center">
                <UserCircleIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
              {user?.firstName}
                </span>
                </a>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
                </svg>
                </button>
                </span>
                      <div
                        className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                        <div
                          className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-40"
                          aria-labelledby="headlessui-menu-button-1"
                          id="headlessui-menu-items-117"
                          role="menu"
                        >
                          <div className="px-4 py-3">
                            <p className="text-sm leading-5">Signed in as</p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                              {user?.email}
                            </p>
                          </div>
                          <div className="py-1">
                            <Link href="/account">
                              <a
                                tabIndex={0}
                                className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                role="menuitem"
                              >
                                Account settings
                              </a>
                            </Link>
                          </div>
                          <div className="py-1">
                            <a
                              onClick={onLogout}
                              tabIndex={3}
                              className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                              role="menuitem"
                            >
                              Log out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  )}
                </>:  <Menu />
              }
            </div>
          </div>
        </div>
        {width <= 1170 && width > 768 && (<div className={"w-full my-15 flex justify-center"}>
          <Menu />
        </div>)
        }
      </div>
      <Modal
        open={openModal}
        onClose={() => { setModalType('signIn'); setOpenModal(false); }}
        closeIcon={width > 639 ? <span><XIcon width="16px" height="16px" color="#000" fontSize="11px" /></span> : null}
      >
        {modalType === "signIn" && openModal && !authenticated ? <SignIn /> : null}
        {modalType === "signUp" && openModal && !authenticated ? <SignUp /> : null}
      </Modal>
    </div>
    </AuthModalContext.Provider>
  );
};

