import axios from "axios";
import { useState } from "react";
import api from "../services/axios";

const GroupSettings = ({ group_id, setSettingPopUpOpen, fetchGroups }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    async function handleDeleteGroup(id) {
        
        try {
            // const response = await axios.delete(
            //     `http://localhost:8080/delete-group/${id}`
            // );
            const response = await api.delete(`/delete-group/${id}`);

            fetchGroups();
            setSettingPopUpOpen(false);
            setDeleteConfirmation(false);
            
        } catch (error) {
            console.log("Group delete error:", error.message);
        }
    }

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">

            <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8 animate-in fade-in zoom-in duration-300">

                <div className="flex justify-end">
                    <button
                        onClick={() => setSettingPopUpOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="text-gray-700">

                    <h4 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                        Group Settings
                    </h4>

                    <button
                        className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 hover:text-red-700 transition-all duration-300 cursor-pointer shadow-sm"
                        onClick={() => setDeleteConfirmation(true)}
                    >
                        Delete Group
                    </button>

                    {deleteConfirmation &&

                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 leading-relaxed">
                            Are you sure you want to delete this group?
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">

                            <button
                                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 cursor-pointer shadow-md"
                                onClick={() => handleDeleteGroup(group_id)}
                            >
                                Delete Group
                            </button>

                            <button
                                className="flex-1 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold transition-all duration-300 cursor-pointer"
                                onClick={() => setDeleteConfirmation(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                    }

                </div>

            </div>

        </div>
        </>
    );
};

export default GroupSettings;