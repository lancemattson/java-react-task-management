import {useState, useEffect, useRef, useCallback} from 'react';
import TaskCard from "./TaskCard";
import DeleteConfirmation from "./DeleteConfirmation";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const TaskList = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTaskId, setCurrentTaskId] = useState(0);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const alertRef = useRef(null);

    const [user] = useState(() => {
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });

    const getTasks = useCallback(()=> {
        if (user) {
            let url = `/api/users/${user.id}/tasks-to-do`;
            if (props.type === 'completed') {
                url = `/api/users/${user.id}/tasks-completed`;
            }
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setTasks(data);
                })
                .catch((err) => {
                    setError(err.message);
                    setTasks(null);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [props.type, user]);

    const handleTaskUpdated = useCallback(()=> {
        getTasks();
    }, [getTasks]);

    useEffect(() => {
        getTasks();

        window.addEventListener('taskUpdated', handleTaskUpdated);

        return () => {
            window.removeEventListener('taskUpdated', handleTaskUpdated);
        };
    }, [getTasks, handleTaskUpdated]);

    function openDeleteModal(id) {
        setCurrentTaskId(id);
        alertRef.current.openModal();
    }

    async function onDeleteConfirm() {
        await deleteTask(currentTaskId);
    }

    async function onComplete(data) {
        await completeTask(data.id, data.completed);
        window.dispatchEvent(new Event("taskUpdated"));
    }

    async function completeTask(id, completed) {
        await fetch(`/api/users/${user.id}/tasks/${id}/complete`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isCompleted: completed,
            }),
        }).catch((err) => {
            setError(err.message);
        }).then(() => {
            let updatedTasks = [...tasks].filter(i => i.id !== id);
            setTasks(updatedTasks);
        });
    }

    async function deleteTask(id) {
        await fetch(`/api/users/${user.id}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            setError(err.message);
        }).then(() => {
            let updatedTasks = [...tasks].filter(i => i.id !== id);
            setTasks(updatedTasks);
            setCurrentTaskId(0);
            alertRef.current.closeModal();
        });
    }

    if (tasks && tasks.length === 0) {
        if (props.type === 'todo') {
            return (
                <p>You currently have no tasks to do. <Link to={"/tasks/new"} className={"text-sky-300 hover:cursor-pointer hover:text-sky-200"}>Create
                a task!</Link></p>
            )
        }
        return (
            <p>You currently have no completed tasks.</p>
        )
    }

    return (
        <div>
            <DeleteConfirmation ref={alertRef} onConfirmClick={onDeleteConfirm}/>
            <div>
                {loading && (
                    <div className="text-xl font-medium text-white">Loading tasks...</div>
                )}
                {error && <div className="text-red-700">{error}</div>}

                <div className={"flex flex-col gap-y-4"}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onDeleteClick={openDeleteModal}
                                  onCompleteClick={onComplete}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TaskList;