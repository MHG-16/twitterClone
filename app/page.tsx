import getCurrentUser from "./actions/getCurrentUser";
import getPosts from "./actions/getPosts";
import Form from "./components/form/Form";
import PostFeed from "./components/posts/PostFeed";
import Header from "./components/share/Header";

export default async function Home() {
  const posts = await getPosts({userId: ''});
  const user = await getCurrentUser();
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" 
      posts={posts} currentUser={user}/>
      <PostFeed />
    </>
  )
}
