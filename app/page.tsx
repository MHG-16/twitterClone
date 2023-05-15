import getCurrentUser from "./actions/getCurrentUser";
import getPosts from "./actions/getPosts";
import Form from "./components/form/Form";
import PostFeed from "./components/posts/PostFeed";
import Header from "./components/share/Header";

export default async function Home() {
  const user = await getCurrentUser();
  const posts = await getPosts({userId: ""});
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" currentUser={user}/>
      <PostFeed posts={posts} userId={user?.currentUser.id}/>
    </>
  )
}
