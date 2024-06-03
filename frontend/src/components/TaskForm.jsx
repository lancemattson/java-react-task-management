import {useState, useEffect} from 'react';
import Button from "./Button";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import {useCookies} from "react-cookie";
import Datepicker from "react-tailwindcss-datepicker";
import {formatDate} from "../helpers/formatDate";

const TaskForm = () => {
    const [task, setTask] = useState({name: '', dueDate: '', createdAt: '', isCompleted: false, userId: 0});
    const [dueDate, setDueDate] = useState({
        startDate: null,
        endDate: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const { id } = useParams();

    const [user] = useState(() => {
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });

    useEffect(() => {
        if (user && id) {
            fetch(`/api/users/${user.id}/tasks/${id}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    let date = new Date(data.dueDate);
                    let formattedDate = formatDate(date);
                    setDueDate({startDate: date, endDate: date});
                    setTask({
                        ...data,
                        dueDate: formattedDate
                    });
                })
                .catch((err) => {
                    setTask(null);
                });
        }
    }, [user, id]);

    async function handleSubmit(event) {
        event.preventDefault();

        await fetch(`/api/users/${user.id}/tasks` + (id ? '/' + id : ''), {
            method: (id) ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
            .then((res) => {
                if (res.ok) {
                    navigate('/tasks');
                } else {
                    setError('Something went wrong');
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    function handleNameChange(event) {
        if (event.target.value) {
            setTask({...task, name: event.target.value});
        }
    }

    function handleDueDateChange(newValue) {
        setDueDate(newValue);
        setTask({
            ...task,
            dueDate: newValue.startDate
        });
    }

    return (
        <div>
            {error !== '' &&
                <p className="text-red-600 font-bold pb-4">{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Enter Task Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block transition-all w-full rounded-md border-0 py-2.5 pl-4 pr-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-light text-sm"
                                    value={task.name || ''}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Due Date
                            </label>
                            <div className="bg-white mt-2">
                                <Datepicker
                                    inputId="datepicker"
                                    primaryColor={"sky"}
                                    asSingle={true}
                                    value={dueDate}
                                    onChange={handleDueDateChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 mt-12'>
                        <Button onClick={() => navigate(-1)}>Back</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default TaskForm;