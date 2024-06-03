import {Fragment, useEffect, useState} from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/20/solid';
import {Link, useLocation, useNavigate} from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [navigation, setNavigation] = useState([]);

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });

    useEffect(() => {
        const updatedNavigation = navigation.map(item => ({
            ...item,
            current: item.href === location.pathname,
        }));
        setNavigation(updatedNavigation);
    }, [location.pathname, navigation]);

    useEffect(() => {
        const handleLoggedInUser = () => {
            const user = localStorage.getItem("user");
            if (user) {
                const foundUser = JSON.parse(user);
                setUser(foundUser);
                setNavigation([
                    { name: 'My Tasks', href: '/tasks', current: true },
                ]);
                navigate('/tasks');
            } else {
                setUser(null);
                setNavigation([]);
                navigate('/');
            }
        };

        window.addEventListener('loggedInUser', handleLoggedInUser);

        return () => {
            window.removeEventListener('loggedInUser', handleLoggedInUser);
        };
    }, [navigate]);

    function logout() {
        localStorage.removeItem('user');
        window.dispatchEvent(new Event("loggedInUser"));
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/"><h5 className="mb-0">Java Spring + React</h5></Link>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <div className="flex items-center gap-x-4">
                                                    {user &&
                                                        <div>{user.firstName} {user.lastName}</div>
                                                    }
                                                    <UserIcon className="h-8 w-8 rounded-full bg-black"/>
                                                </div>
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {user ?
                                                    (
                                                        <div>
                                                            <MenuItem key="tasks"><Link to="/tasks" className="block px-4 py-2 text-sm text-gray-700">My Tasks</Link></MenuItem>
                                                            <MenuItem key="logout"><Link to="/" onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Log Out</Link></MenuItem>
                                                        </div>
                                                    ) :
                                                    <MenuItem key="login"><Link to="/login" className="block px-4 py-2 text-sm text-gray-700">Log In</Link></MenuItem>
                                                }
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5 sm:px-6">
                                <div className="flex-shrink-0">
                                    <UserIcon className="h-10 w-10 rounded-full bg-black"/>
                                </div>
                                {user &&
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">{user.firstName} {user.lastName}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>
                                }
                            </div>
                            <div className="mt-3 space-y-1 px-2 sm:px-3">
                                {user ?
                                    <Link to="/" onClick={logout} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Log Out</Link> :
                                    <Link to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Log In</Link>
                                }
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
