import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {useCookies} from "react-cookie";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.dispatchEvent(new Event("loggedInUser"));
                    navigate('/');
                } else {
                    setError((data.message));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2">
                    <h3 className="mb-4">Login</h3>
                    <div className="bg-white rounded-lg shadow p-8">
                        {error !== '' &&
                            <p className="text-red-600 font-bold pb-4">{error}</p>
                        }
                        <form onSubmit={login}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;