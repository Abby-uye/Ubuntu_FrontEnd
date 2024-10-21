export const SOCKET_BASE_URL = "http://localhost:8081"
export const BACKEND_MESSAGE_BASE_URL = "http://localhost:8099/ubuntu/chatMessage"
export const BACKEND_USER_BASE_URL = "http://localhost:8099/ubuntu/user";
export const BACKEND_COHORT_BASE_URL = "http://localhost:8099/ubuntu/cohort";
export const BACKEND_POST_BASE_URL = "http://localhost:8099/ubuntu/post";
export const BACKEND_BASE_URL = "http://localhost:8099";
export const BACKEND_CHATROOM_BASE_URL = "http://localhost:8099/ubuntu/chatroom";
export const BACKEND_AUTH_URL = "http://localhost:8099/ubuntu/user/auth";
export const BACKEND_COMMUNITY_MANAGER_BASE_URL = "http://localhost:8099/api/v1/community_manager";
export const BACKEND_COMMENT_BASE_URL = "http://localhost:8099/ubuntu/comment";
export const BACKEND_EVENT_BASE_URL = "http://localhost:8099/api/v1/community_manager";
export const BACKEND_QUESTION_BASE_URL = "http://localhost:8099/ubuntu/question";




// module.exports = {BACKEND_BASE_URL, BACKEND_POST_BASE_URL, BACKEND_COHORT_BASE_URL, BACKEND_USER_BASE_URL, BACKEND_MESSAGE_BASE_URL};
export const FORMATDATETIME = (dateObj) => {
   return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
};

export const FORMATDATE = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();

  // Add the appropriate suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};
