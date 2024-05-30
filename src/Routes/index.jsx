import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import PostModal from "../features/post/PostModal";
import AddMemberToCohort from "../features/AddMemberToCohort";
import CommunityManagerPage from "../features/CommunityManagerPage";
import Login from "../features/Login";
import AddCohort from "../features/AddCohort";

export const Routes = [
    {
        path: "",
        element: <Home/>
    },
    {
        path: "/chat",
        element: <Chat/>,
    },
    {
        path: "/community_manager",
        element: <CohortState/>,
    },
    {
        path:"/post",
        element:<PostModal/>,
    },
    {
        path: "/communityManagerPage",
        element: <CommunityManagerPage/>
    }
    , {
        path: "/login",
        element: <Login/>
    }

    , {
        path: "/add_student",
        element: <AddMemberToCohort/>
    },
    {
        path: "/addCohort",
        element: <AddCohort/>
    },{
        path: "/addMember",
        element: <AddMemberToCohort/>
    }
]
