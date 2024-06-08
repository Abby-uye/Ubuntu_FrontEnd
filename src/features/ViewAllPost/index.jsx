import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css"
import { BACKEND_COMMENT_BASE_URL, BACKEND_POST_BASE_URL } from "../../ApiUtils";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import {jwtDecode} from "jwt-decode"
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ViewAllPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [serverError, setServerError] = useState("");
    const [userId, setUserId] = useState("");
    const [isComment, setIsComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState();
    const [comment, setComment] = useState("");

    useEffect(() => {
        try{
            const token = localStorage.getItem("token");
            if(token){
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sender_email);
            }else navigate("/home");
        }catch(error){
            console.log(error);
            navigate("/home")
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

    const userHasLikePost = (likes) => {return userId in likes}

    const userLikePost = (likes) => {return likes[userId];}

    const openComment = async(postId) => {
        if(isComment === false){
            try{
                const response = await axios.get(BACKEND_COMMENT_BASE_URL+`/list/${postId}`)
                if (response.status === 200){
                    let data = response.data;
                    setPostId(postId);
                    setComments(data);
                }
            }catch(error){
                console.log(error);
            }
        }
        setIsComment(!isComment);
    }

    const handleComment = async(event) => {
        event.preventDefault();
        const payload = {postId : postId, userId : userId,content : comment,};
        try{
            const response = await axios.post(BACKEND_COMMENT_BASE_URL, payload)
            if (response.status === 201){
                let data = response.data;
                postComment(data.id);
                setComment("");
            }
        }catch(error){
            console.log(error);
        }
    };

    const postComment = async(commentId) => {
        try{
           const response = await axios.get(BACKEND_COMMENT_BASE_URL+`/${commentId}`)
           if(response.status === 200){
            setComments((previousComment) => [...previousComment, response.data]);
           }
        }catch(error){
            console.log(error);
        }
    };



    return (
        <div className={styles.viewAllPost} >
            {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        {post.image && <img src={post.image} alt="event"/>}
                        <div className={styles.likeAndComment}>
                         <button onClick={() => handleLikeBtn(post.id)} className={styles.theButton}>
                            {post.likes && userHasLikePost(post.likes) && userLikePost(post.likes) ? <FcLike/> : <FcDislike/>} {getNumberOfLikes(post.likes)}
                        </button>
                            <button className={styles.theButton} onClick={() => openComment(post.id)}>Comment</button>
                        </div>
                        <div className={styles.comments}>
                        {postId === post.id && isComment && comments.map((comment, index) => {
                            return(
                            <div key={index} className={styles.comment}>
                                <FaRegUserCircle size={"25px"}/>
                                <div className={styles.userDetails}>
                                    <p>{comment.userEmail}</p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        )
                    })} 
                    </div>
                    {postId === post.id && isComment && (
                            <div style={{display:"flex"}}>
                                <input
                                type="text"
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Write A Comment"
                                className={styles.input}
                                />
                                <button onClick={handleComment} className={styles.btn}>
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                            </div>
                    )}
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
