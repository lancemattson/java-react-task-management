import TaskList from "../components/TaskList";
import LinkButton from "../components/LinkButton";
import { PlusIcon } from '@heroicons/react/20/solid';

const MyTasks = () => {
    return (
        <div>
            <div className='md:flex justify-between mb-10 md:mb-4'>
                <h3>My Tasks</h3>
                <LinkButton route={'/tasks/new'}>
                    <div className='flex items-center gap-x-2'>
                        <PlusIcon className='w-6'/> Add new task
                    </div>
                </LinkButton>
            </div>
            <div className={"md:flex gap-x-20"}>
                <div className={"w-full md:w-1/2 mb-8 md:mb-0"}>
                    <h4>To Do</h4>
                    <TaskList type="todo"/>
                </div>
                <div className={"w-full md:w-1/2"}>
                    <h4>Completed</h4>
                    <TaskList type="completed"/>
                </div>
            </div>
        </div>
    );
};

export default MyTasks;