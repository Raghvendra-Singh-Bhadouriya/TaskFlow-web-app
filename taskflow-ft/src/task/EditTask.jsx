import axios from "axios";
import { useEffect, useReducer } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../services/axios";

const initialState = {
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loading: true,
                error: "",
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                taskData: action.payload,
                title: action.payload.title,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                assignedTo: action?.payload?.assignedTo,
                loading: false,
                error: "",
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case "SET_FIELD":
            return {
                ...state,
                [action.name]: action.value,
            };

        case "RESET":
            return initialState

        default:
            return state;
    }
}


const EditTask = ({taskId, setEditTaskFormIsOpen}) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

//========= Get the task data ============//
    async function getTaskData(taskId){
        //const token = localStorage.getItem("token")

        dispatch({
            type: "FETCH_START",
            loading: true
        })

        try {
            // const response = await axios.get(`http://localhost:8080/group/single-task/${taskId}`,{
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            const response = await api.get(`/group/single-task/${taskId}`)

            dispatch({type: "FETCH_SUCCESS", payload: response?.data?.data})
        } catch (error) {
            dispatch({type: "FETCH_ERROR", 
                payload: error?.response?.data || error.message || "Unable to load data"})
        }
    }

    useEffect(() => {
        getTaskData(taskId)
    },[taskId])

    //=============== Set Field for updated data ================//
    function handleChange(e){
        dispatch({
            type: "SET_FIELD",
            name: e.target.name,
            value: e.target.value
        })
    }

    //============== Submit the updated data ===============// 
    async function handleSubmit(e){
        e.preventDefault();

        const token = localStorage.getItem("token");

        const updatedData = {
            title: state.title,
            description: state.description,
            dueDate: state.dueDate,
            assignedTo: state.assignedTo_id,
        };

        try {
            let response = await axios.patch(`http://localhost:8080/update_task/${taskId}`,
                updatedData,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return(
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8">

                {/* Closing Button */}
                <div className="flex justify-end">
                    <button onClick={() => setEditTaskFormIsOpen(false)}><FaTimes className="text-xl text-red-500"/></button>
                </div>

                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Edit Task
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Update task details and save your changes.
                    </p>
                </div>

                <div>
                    <form  onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                            type="text"
                            name="title"
                            value={state.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                            type="text"
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe your task..."
                            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                            />
                        </div>

                        {/* Due Date & Assigned To */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Due Date
                                </label>
                                <input
                                type="date"
                                name="dueDate"
                                value={state.dueDate}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />
                            </div>

                            {/* Assigned To */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    AssignedTo
                                </label>
                                <input
                                type="text"
                                name="assignedTo"
                                value={state?.assignedTo?.username}
                                placeholder="Username"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none bg-gray-50 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">

                            <button
                                type="button"
                                onClick={() => setEditTaskFormIsOpen(false)}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditTask;