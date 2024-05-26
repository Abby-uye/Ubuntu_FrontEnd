import Chat from "../features/Chat";
import CohortState from "../features/CohortState";

export const Routes =[
    {
        path:"",
        element:<Chat/>,

    },
    {
        path:"/community_manager",
        element:<CohortState/>,

    },
]
