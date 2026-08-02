import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteTask = ({ taskId }) => {
    const [ error, setError ] = useState("")
    const navigate = useNavigate();

    //=========== Task Delete function ==============// 
    async function handleDelete(id){
        const token = localStorage.getItem("token")
        try {
            let res = await axios.delete(`http://localhost:8080/delete-task/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            confirm("Are you sure do you want to delete task")
            if(res?.response?.success === true){
                navigate("/group/groupId")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
            console.log("error", error)
        }
    }

    
    return(
        <>
        <button
        type="button"
        onClick={() => handleDelete(taskId)}
            className="
              w-full
              sm:w-auto

              px-6
              py-3

              rounded-xl

              bg-red-600
              hover:bg-red-700

              text-white
              font-semibold

              transition
              duration-300

              shadow-md
              hover:shadow-xl
            "
          >
            🗑 Delete Task
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </>
    )
}

export default DeleteTask;