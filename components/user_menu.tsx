import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactNode, forwardRef } from "react";
import { logoutFunc } from "../lib/auth";
import { useAuth } from "../context/auth";

const items = [
  {
    label: "プロフィール",
    href: "/priofile",
  },
  {
    label: "設定",
    href: "/settings",
  },
];

const MyLink = forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    children: ReactNode;
    className: string;
  }
>((props, ref) => {
  let { href, children, className, ...rest } = props;
  return (
    <Link href={href}>
      <a className={className} ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = "MyLink";

const UserMenu = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <div className=" text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="bg-slate-300 rounded-full w-9 h-9 block overflow-hidden">
            <img
              src={user.avatarURL}
              className="w-full h-full object-cover block"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <MyLink
                      href={item.href}
                      className={`${
                        active ? "bg-green-200" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.label}
                    </MyLink>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-green-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={logoutFunc}
                  >
                    ログアウト
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
