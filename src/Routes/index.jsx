import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import PostModal from "../features/post/PostModal";
import AddMemberToCohort from "../features/AddMemberToCohort";
import CommunityManagerPage from "../features/CommunityManagerPage";
import Login from "../features/Login";
import AddCohort from "../features/AddCohort";
import AddEvent from "../features/AddEvent";
import AllEvent from "../features/AllEvents";

export const Routes = [
    {
        path: "/home",
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
    },
    {
        path: "/addEvent",
        element: <AddEvent/>
    }
    , {
        path: "/allEvent",
        element: <AllEvent/>
    }
]
