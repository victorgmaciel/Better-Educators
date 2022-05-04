import { React, useState, useEffect } from 'react';
import '../Home.css'
import logo from '../logo.png'
import { db, auth } from '../firebase/firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'



function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts")


    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    });
    return (
        <div className='homePage'>
            <header>
                <img src={logo} className="App-logo" alt="logo">
                </img>
            </header>
            {postLists.map((post) => {
                return <div className='post'>
                    <div className='postHeader'>
                        <div className='title'>
                            <h1>{post.title}</h1>
                        </div>
                    </div>
                    <div className='postTextContainer'>{post.postText}</div>
                    <h4>@ {post.author.name}</h4>
                </div>
            })}
        </div>
    );
}
export default Home;