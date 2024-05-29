import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import PostModal from "../features/post/PostModal";
import Modal from "../features/Modal";
import AddMemberToCohort from "../features/AddMemberToCohort";
import CommunityManagerPage from "../features/CommunityManagerPage";
import Login from "../features/Login";

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
]
