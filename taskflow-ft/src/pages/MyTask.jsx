import React,{ useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import api from "../services/axios";


const initialState = {
    data: [],
    loading: false,
    error: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        default:
            state;
    }
}

const MyTask = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [ updateFormData, setUpdateFormData ] = useState({
        title: "",
        description: "",
        status: ""
    });

    const { Open } = useContext(ToggleFormShowContext)
    const { decodedToken, logIn } = useContext(AuthContext)
    const [ loading, setLoading ]  = useState(false);
    const [ showForm, setShowForm ] = useState(false);
    const [ editingId, setEditingId ] = useState(null);

// =======Fetch user tasks only======================//
    async function fetchUserTask(decodedToken){

        dispatch({type: "FETCH_START", loading: true})
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const id = decodedToken?.id

            if(!token || !id) return;

            // console.log(id)
            // let res = await axios.get(
            //     `http://localhost:8080/my_task/${id}`,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     }
            // )
            let res = await api.get(`/my_task/${id}`)

            setLoading(false);
            dispatch({type: "FETCH_SUCCESS", loading: false, payload: res?.data?.data})
            console.log(res?.data?.data)
        } catch (error) {
            setLoading(true);
            dispatch({type: "ERROR", error: true, loading: false})
            console.log("error in fetching data by id", error.message)
        }
    }

    // ===================================================================================================//
        function updateFormChange(e){
            setUpdateFormData({
                ...updateFormData,
                [e.target.name]: e.target.value
            });
        }

    // ------------------- handleUpdate function for update data and store in backend --------------- //
        async function handleUpdate(e){
            e.preventDefault();
    
            const token = localStorage.getItem("token");
    
            if (!token) {
                alert("Authentication token not found. Please log in again.");
                return; // Stop the function if no token is found
            }
    
            try {
                // let res = await axios.put(`http://localhost:8080/update_task/${editingId}`,updateFormData,
                //     {
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     }
                // );
                let res = await api.put(`/update_task/${editingId}`, updateFormData)
                
    
                const updatedList = state.data.map(task => task._id === editingId ? res.data.data : task);
                dispatch({ type: "FETCH_SUCCESS", payload: updatedList });
    
                console.log("Project updated successfully", res);
                alert("Project updated successfully", res)
                setShowForm(false);
                setEditingId(null);
            } catch (error) {
                console.log("Error in updating project", error.message);
                alert(`Error updating task: ${error.response?.data?.message || "Something went wrong."}`);
            }
        }
    
        function handleCancleAndCloseEditForm(){
            setShowForm(false)
        }
    
    // ========================================= handleDelete Function for delete the task =================================================//
        async function handleDelete(id){
    
            const token = localStorage.getItem("token");
    
            if (!token) {
                alert("Authentication token not found. Please log in again.");
                return; // Stop the function if no token is found
            }

            try {
                await axios.delete(`http://localhost:8080/delete_task/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                dispatch({ type: "FETCH_DELETE", payload: state.data.filter(task => task._id !== id) })
                console.log("successfully deleted")
                
            } catch (error) {
                console.log("error in delete data:", error .message)
                alert(`Error deleting task: ${error.response?.data?.message || "Something went wrong."}`);
            }
        }

    useEffect(() => {
        if(!decodedToken?.id) return;
        fetchUserTask(decodedToken)
    }, [decodedToken])

    return(
        <>
        {/* <Form /> */}
        <div className="pt-[8%]">
            <div className="flex justify-end mr-[5%]">
                <button className="bg-red-500 text-white font-bold p-[1%] rounded-xl cursor-pointer" onClick={Open}>Create Task</button>
            </div>

            <div>
                {showForm && (
                <div className="w-[100%] flex items-center justify-center backdrop-blur-sm absolute">
                    <form onSubmit={handleUpdate} className=" w-[30%] p-[2%] rounded-2xl shadow-2xl bg-white ">
                        <label>Update Title:</label><br/>
                        <input
                            type="text"
                            name="title"
                            value={updateFormData.title}
                            onChange={updateFormChange}
                            className="border border-gray-300 mb-5 w-[100%] p-[1%] rounded-lg"
                        />
                        <br/>

                        <label>Update Description</label><br/>
                        <textarea
                            name="description"
                            value={updateFormData.description}
                            onChange={updateFormChange}
                            className="border border-gray-300 mb-5 w-[100%] p-[1%] rounded-lg"
                        />
                        <br/>

                        <label>Update Status</label><br/>
                        <select
                            name="status"
                            value={updateFormData.status}
                            onChange={updateFormChange}
                            className="border border-gray-300 mb-5 w-[100%] p-[1%] rounded-lg"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <br/>

                        <div className="w-[80%] m-auto flex justify-between">
                            <button onClick={handleCancleAndCloseEditForm}
                                className="border border-red-500 text-red-500 font-bold px-[6%] py-[2%] rounded-2xl"
                            >
                                Cancle
                            </button>
                            <button type="submit"
                                className="border border-blue-500 text-blue-500 font-bold px-[6%] py-[2%] rounded-2xl"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <Loading count = {state?.data?.length || 20}/>
                )
                :
                (
                <div className="w-[80%] m-auto grid grid-cols-3 gap-4">
                    {state?.data?.map((task) => {
                        return(
                            <div key={task._id}
                                className="rounded-2xl shadow-2xl p-[5%] bg-gray-300"
                            >
                                <h2><strong>Title:</strong> {task.title}</h2>
                                <p><strong>Desc:</strong> {task.description}</p>
                                <p><strong>Status:</strong> {task.status}</p>
                                <p><strong>Created on:</strong> {task.createdAt}</p>

                            {logIn && (
                                <div className=" m-auto mt-[4%] w-[80%] flex justify-between">
                                    <button 
                                    onClick={() => {
                                        setShowForm(true);
                                        setEditingId(task._id)
                                        setUpdateFormData({
                                            title: task.title,
                                            description: task.description,
                                            status: task.status
                                        })
                                    }}
                                    className="bg-blue-500 px-[6%] py-[2%] text-white font-bold rounded-xl cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 px-[6%] py-[2%] text-white font-bold rounded-xl cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div> 
                        )
                    })}
                </div>
                )
            }
            </div>
        </div>
        </>
    )
}

export default MyTask;