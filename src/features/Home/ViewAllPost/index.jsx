import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css"

const ViewAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const handleGetAllPost = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/post/all_post");
                // console.log(response)
                if (response.status === 200) {
                    const data = await response.data.posts
                    console.log(data)
                    setPosts(data);
                    setServerError("");
                    // console.log(posts.length);
                }
            } catch (error) {
                setServerError("temporarily unavailable");
            }
        };

        handleGetAllPost();
    }, []);



    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>

                        <div className={styles.likeAndComment}>
                           <button className={styles.theButton}>Like</button>
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
