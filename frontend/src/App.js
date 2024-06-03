import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import MyTasks from './Pages/MyTasks';
import TaskNewEdit from './Pages/TaskNewEdit';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div>
            <Navigation/>
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/tasks" element={<MyTasks/>}/>
                    <Route path="/tasks/new" element={<TaskNewEdit/>}/>
                    <Route path="/tasks/:id/edit" element={<TaskNewEdit/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
