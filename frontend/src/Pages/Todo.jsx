import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Create from './Create';
import axios from 'axios';
import { BsCircle } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

// Create an Axios instance to centralize configurations
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',  //  backend URL
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function Todo() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [todos, setTodos] = useState([]);

    // Fetch todos when the component mounts
    useEffect(() => {
        axiosInstance.get('/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axiosInstance.put(`/update/${id}`)
            .then(res => {
                setTodos(prev =>
                    prev.map(todo => todo._id === id ? res.data : todo)
                );
            })
            .catch(err => console.log(err));
    };

    const handleRemove = (id) => {
        axiosInstance.delete(`/remove/${id}`)
            .then(result => {
                setTodos(prev => prev.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear stored user data
        localStorage.removeItem('token'); // Clear the token as well
        setTodos([]);
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">MyApp</h2>
                <div>
                    <button className="button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div><p>Welcome {user.username}</p></div>

            <div className='home'>
                <h2>Todo List</h2>
                <Create />
                {
                    todos.length === 0 ?
                        <div><h3>No Tasks</h3></div>
                        :
                        todos.map((todo, index) => (
                            <div key={todo._id || index} className='task'>
                                <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                    {todo.done ?
                                        <BsFillCheckCircleFill className='icon' /> : <BsCircle className='icon' />
                                    }
                                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                </div>
                                <div className="checkbox">
                                    <span><BsFillTrashFill className='icon' onClick={() => handleRemove(todo._id)} /></span>
                                </div>
                            </div>
                        ))
                }
            </div>
        </>
    );
}

export default Todo;
