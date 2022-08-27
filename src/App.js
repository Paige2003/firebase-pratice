import React from "react"
import './App.css';
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  async function updatePost() {
    const hardCodedId = "dS3oAfMRtdHXeaB6WFa1"
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostsById(hardCodedId)
    const newPost = {
      ...post,
      title: "Land a 700k job"
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "dS3oAfMRtdHXeaB6WFa1"
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "finish interview section",
      description: "do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts)
  }

  async function getPostsById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostsByUid(){
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    setLoading(false);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user)
      }
    })
  }, [])

  function register(){
    createUserWithEmailAndPassword(auth, "email@gmail.com", "test123")
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
      console.log(error)
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@gmail.com", "test123")
      .then(({ user }) => {
        console.log(user)
        setUser(user);
      })
      .catch((error) => {
      console.log(error)
      })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading.." : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Post</button>
      <button onClick={getPostsById}>Get Post by Id</button>
      <button onClick={getPostsByUid}>Get Post by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
