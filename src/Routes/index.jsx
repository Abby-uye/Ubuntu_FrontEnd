import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";

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
        path:"/community_manager",
        element:<CohortState/>,
    },
]
