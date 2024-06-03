import {useParams} from 'react-router-dom';
import TaskForm from "../components/TaskForm";
import {useMemo} from "react";

const TaskNewEdit = (factory, deps) => {
    const { id } = useParams();

    const formType = useMemo(() => {
        return id === undefined ? 'new' : 'edit';
    }, [id])
    const title = useMemo(() => {
        if (formType === 'new') {
            return 'Create New Task';
        }
        if (formType === 'edit') {
            return `Edit Task ${id}`;
        }
        return '';
    }, [id, formType]);
    return (
        <div>
            <h4 className='mb-4'>{title}</h4>
            <div className='w-1/2'>
                <TaskForm />
            </div>
        </div>
    );
};

export default TaskNewEdit;