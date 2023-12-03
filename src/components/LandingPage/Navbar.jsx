import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import navLogo from "../../assets/Logo/singLogoBlack.png";
import { logoutCustomer } from "../../redux/reducers/authCustomerSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const company = [
  {
    name: "About us",
    href: "/",
    description:
      "Learn more about our company values and mission to empower others",
  },
  {
    name: "Careers",
    href: "/",
    description:
      "Looking for you next career opportunity? See all of our open positions",
  },
  {
    name: "Support",
    href: "/",
    description:
      "Get in touch with our dedicated support team or reach out on our community forums",
  },
  {
    name: "Blog",
    href: "/",
    description:
      "Read our latest announcements and get perspectives from our team",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authCustomer.isAuth);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["clientToken"]);
  const handleLogout = () => {
    removeCookie("clientToken", { path: "/" });
    window.localStorage.clear("persist:root");
    dispatch(logoutCustomer());
  };
  const customer = useSelector((state) => state.authCustomer.customer);
  let fallbackAvatar = "";
  if (customer && isAuth) {
    const fullName = `${customer.first_name} ${customer.last_name}`;
    const [firstNameInitial, lastNameInitial] = fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase());
    fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;
  }
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img className="h-8 w-auto" src={navLogo} alt="Rentlify" />
            <span className="uppercase font-semibold ">RENTLIFY</span>
          </Link>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link to="" className="text-sm font-medium leading-6 text-gray-900">
            Home
          </Link>
          <Link to="" className="text-sm font-medium leading-6 text-gray-900">
            Discover
          </Link>

          <Link to="" className="text-sm font-medium leading-6 text-gray-900">
            Features
          </Link>
          <Link to="" className="text-sm font-medium leading-6 text-gray-900">
            Marketplace
          </Link>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-medium outline-none leading-6 text-gray-900">
              Company
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-96 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-gray-900/5">
                {company.map((item) => (
                  <div
                    key={item.name}
                    className="relative rounded-lg p-4 hover:bg-gray-50"
                  >
                    <a
                      href={item.href}
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <div className="lg:flex-1 flex items-center justify-end gap-4">
          {!isAuth ? (
            <>
              <div className="hidden lg:flex lg:justify-end">
                <Button
                  variant="outline"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="bg-primary text-white hover:bg-primary/80 hover:text-white transition-all"
                >
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-9 w-9 border border-black/20">
                      <AvatarFallback>{fallbackAvatar}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {customer.first_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {customer.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={handleLogout}
                  >
                    <span className="font-semibold">Host Mode</span>
                    <Icon icon="tabler:switch-3" className="w-4 h-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={handleLogout}
                  >
                    <span>Account</span>
                    <Icon icon="solar:user-linear" className="w-4 h-4" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={handleLogout}
                  >
                    <span>Log out</span>
                    <Icon
                      icon="solar:logout-2-line-duotone"
                      className="w-4 h-4"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger className="flex">
                <Bars3Icon className="h-6 w-6 self-center" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[540px] lg:hidden fixed inset-y-0 right-0 z-50 transition-all flex flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5">
                      <img
                        className="h-8 w-auto"
                        src={navLogo}
                        alt="RENTLIFY"
                      />
                    </Link>
                    <SheetClose>
                      <XMarkIcon className="h-5 w-5" />
                    </SheetClose>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <Link
                          to="/"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Home
                        </Link>
                        <Link
                          to="/discover"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Discover
                        </Link>

                        {company.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="py-6">
                        {!isAuth ? (
                          <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Log in
                          </Link>
                        ) : (
                          <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Logout
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      {/* <Dialog
        as="div"
        className="lg:hidden transition-all"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 transition-all" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 transition-all flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={navLogo} alt="RENTLIFY" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {products.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>

                  {company.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 text-center">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
}
