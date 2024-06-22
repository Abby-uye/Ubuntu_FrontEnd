import Chat from "../features/Chat";
import CohortState from "../features/CohortState";
import Home from "../features/Home";
import AddMemberToCohort from "../features/AddMemberToCohort";
import CommunityManagerPage from "../features/CommunityManagerPage";
import Login from "../features/Login";
import AddCohort from "../features/AddCohort";
import AddEvent from "../features/AddEvent";
import AllEvent from "../features/AllEvents";
import QuestionsHall from "../features/QuestionsHall";
import AskQuestion from "../features/QuestionsHall/AskQuestion";
import AllQuestions from "../features/QuestionsHall/AllQuestions";
import AllUserQuestions from "../features/QuestionsHall/AllUserQuestions";
import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from "../ApiUtils";

const socket = io(SOCKET_BASE_URL);
socket.on("connect", () => {
    console.log("Connected User with ", socket)
})

export const Routes = [
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: "/chat",
        element: <Chat socket={socket}/>,
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
        path: "/add_student",
        element: <AddMemberToCohort/>
    },
    {
        path: "/addCohort",
        element: <AddCohort/>
    }, {
        path: "/addMember",
        element: <AddMemberToCohort/>
    },
    {
        path: "/addEvent",
        element: <AddEvent/>
    }
    ,{
        path: "/allEvent",
        element: <AllEvent/>
    },
    {
        path: "/questionsHall",
        element: <QuestionsHall/>
    },{
        path: "/askQuestion",
        element: <AskQuestion/>
    },{
        path: "/allQuestion",
        element: <AllQuestions/>
    },{
        path: "/allUserQuestions",
        element: <AllUserQuestions/>
    }


]
