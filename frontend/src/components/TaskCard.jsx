import { Link } from 'react-router-dom';
import {TrashIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {formatDate} from "../helpers/formatDate";

const TaskCard = ({task, className, onDeleteClick, onCompleteClick}) => {
    const [formattedDueDate, setFormattedDueDate] = useState(null);

    useEffect(() => {
        const date1 = new Date(task.dueDate);
        const formattedDueDate = formatDate(date1);
        setFormattedDueDate(formattedDueDate);
    }, [task.dueDate]);

    const handleOnCompleted = (event) => {
        onCompleteClick({id: task.id, completed: event.target.checked});
    };

    const onDelete = () => {
        onDeleteClick(task.id);
    };
    return (
        <div className={'col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow '  + className}>
            <div className="flex w-full items-center justify-between space-x-6 p-6 text-black">
                <div className="flex w-full items-center space-x-6">
                    <div className="relative flex gap-3 items-center">
                        <div className="flex items-center">
                            <input
                                id="completed"
                                aria-describedby="completed-description"
                                name="completed"
                                type="checkbox"
                                className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                checked={task.isCompleted}
                                onChange={handleOnCompleted}
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <div className="font-medium text-lg text-gray-900">
                                {task.name}
                            </div>
                            <div id="completed-description" className="text-gray-500">
                                {task.dueDate ?
                                    <p>Due {formattedDueDate}</p> :
                                    <p>No Due Date</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="isolate inline-flex rounded-md">
                    <Link
                        type="button"
                        to={`/tasks/${task.id}/edit`}
                        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                        <PencilSquareIcon className="w-5 text-gray-800"/>
                    </Link>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    <TrashIcon className="w-5 text-red-700"/>
                  </button>
                </div>
            </div>
            {/*<div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <a
                            href={`mailto:${client.email}`}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            {client.email}
                        </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <a
                            href={`tel:${client.phone}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            {client.phone}
                        </a>
                    </div>
                </div>
            </div>*/}
        </div>
    );
}
export default TaskCard;