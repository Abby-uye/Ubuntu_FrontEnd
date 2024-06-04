import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css"
import { BACKEND_POST_BASE_URL } from "../../ApiUtils";

const ViewAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
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
           const response = await axios.post(BACKEND_POST_BASE_URL+"/like/"+postId);
        }catch(error){
            console.log(error);
        }
    }



    return (
        <div className={styles.viewAllPost} >
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        {post.image && <img src={post.image} alt="event"/>}
                        <div className={styles.likeAndComment}>
                           <button onClick={(event) => handleLikeBtn(post.id)} className={styles.theButton}>Like{" " + post.numberOfLikes}</button>
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
