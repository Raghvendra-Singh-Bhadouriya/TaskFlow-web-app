import { createContext, useState } from "react";

export const ToggleFormShowContext = createContext();

export const ToggleFormShowProvider = ({children}) => {
    
    const [ showForm, setShowForm ] = useState(false);
    const [ showTaskForm, setShowTaskForm ] = useState(false);
    const [ showAddMemberForm, setShowAddMemberForm ] = useState(false);
    const [ showGroupMenu, setShowGroupMenu ] = useState(false);

    const Open = () => setShowForm(true);
    const Close = () => setShowForm(false);

    // Toggle Create Task Form //
    const TaskFormOpen = () => setShowTaskForm(true);
    const TaskFormClose = () => setShowTaskForm(false);

    // Toggle Add Member Form //
    const AddMemberFormOpen = () => setShowAddMemberForm(true);
    const AddMemberFormClose = () => setShowAddMemberForm(false);

    // Toggle to Show the Menu of particular group //
    const GroupMenuOpen = () => setShowGroupMenu(true);
    const GroupMenuClose = () => setShowGroupMenu(false);

    return(
        <ToggleFormShowContext.Provider value=
        {{ 
            showForm,
            Open,
            Close,

            showTaskForm,
            TaskFormClose,
            TaskFormOpen,

            showAddMemberForm,
            AddMemberFormClose,
            AddMemberFormOpen,

            showGroupMenu,
            GroupMenuOpen,
            GroupMenuClose
        }}
        >
            { children }
        </ToggleFormShowContext.Provider>
    )
}