import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import CommunityManagerPage from "../features/CommunityManagerPage";
import Login from "../features/Login";
import ChatConnection from "../features/ChatConnection";

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
        path: "/communityManagerPage",
        element: <CommunityManagerPage/>
    }
    , {
        path: "/login",
        element: <Login/>
    }
    , {
        path: "/chatConnection",
        element: <ChatConnection/>
    }
]
