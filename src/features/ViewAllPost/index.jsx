import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css"
import { BACKEND_POST_BASE_URL } from "../../ApiUtils";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom";

const ViewAllPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [serverError, setServerError] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        try{
            const token = localStorage.getItem("token");
            if(token){
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sender_email);
            }else navigate("/home");
        }catch(error){
            console.log(error);
        }

        const handleGetAllPost = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/post/all_post");
                if (response.status === 200) {
                    const data = await response.data;
                    setPosts(data);
                    setServerError("");
                }
            } catch (error) {
                setServerError("temporarily unavailable");
            }
        };

        handleGetAllPost();
    }, []);

    const handleLikeBtn = async(postId) => {
        try{
            const payload = {
                userId: userId,
                postId: postId
            }
           const response = await axios.post(BACKEND_POST_BASE_URL+"/like", payload);
           if(response.status === 202){
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              likes: {
                                  ...post.likes,
                                  [userId]: !post.likes[userId]
                              }
                          }
                        : post
                )
           )}
        }catch(error){
            console.log(error);
        }
    }

   

    const getNumberOfLikes = (likes) => {
        likes = new Map(Object.entries(likes));
        let numberOfLike = 0;
        for(var like of likes.values()){
            if(like){
                numberOfLike += 1;
            }
        }
        return numberOfLike;
    }

    const userHasLikePost = (likes) => {
        const objToMap = new Map(Object.entries(likes));
        return objToMap.has(userId);
    }

    const userLikePost = (likes) => {
        const objToMap = new Map(Object.entries(likes));
        return objToMap.get(userId);
    }

    return (
        <div className={styles.viewAllPost} >
            {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        {post.image && <img src={post.image} alt="event"/>}
                        <div className={styles.likeAndComment}>
                         <button onClick={(event) => handleLikeBtn(post.id)} className={styles.theButton}>
                            {post.likes && userHasLikePost(post.likes) && userLikePost(post.likes) ? <FcLike/> : <FcDislike/>} {getNumberOfLikes(post.likes)}
                        </button>
                            <button className={styles.theButton}>Comment</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
            {serverError && <span>{serverError}</span>}
        </div>
    );
};

export default ViewAllPost;
