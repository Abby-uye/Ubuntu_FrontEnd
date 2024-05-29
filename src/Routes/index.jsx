import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import Modal from "../features/Modal";
import AddMemberToCohort from "../features/AddMemberToCohort";

export const Routes =[
    {
        path:"",
        element:<Home/>
    },
    {
        path:"/chat",
        element:<Chat/>,
    },

    {
        path:"/modal",
        element:<AddMemberToCohort/>,
    },
    {
        path:"/community_manager",
        element:<CohortState/>,
    },
]
