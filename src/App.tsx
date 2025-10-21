import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyPostsPage = lazy(() => import("./pages/PostsPage/PostsPage"));
const LazyPostPage = lazy(() => import("./pages/PostPage/PostPage"));
const LazyProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const LazyEditProfilePage = lazy(() => import("./pages/EditProfilePage/EditProfilePage"));
const LazyCreateCommentPage = lazy(() => import("./pages/CreateCommentPage/CreateCommentPage"));
const LazyCreatePostPage = lazy(() => import("./pages/CreatePostPage/CreatePostPage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const LazyRegistrationPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage"));

function App() {

  return (
      <Suspense>
        <Routes>
            <Route path="/" index element={<LazyPostsPage />} />
            <Route path="/post/:postId" element={<LazyPostPage />} />
            <Route path="/profile" element={<LazyProfilePage />} />
            <Route path="/login" element={<LazyLoginPage />} />
            <Route path="/registration" index element={<LazyRegistrationPage />} />
            <Route path="/profile/edit" index element={<LazyEditProfilePage />} />
            <Route path="/newpost" element={<LazyCreatePostPage />} />
            <Route path="/newcomment/:postId" element={<LazyCreateCommentPage />} />
        </Routes>
      </Suspense>
  )
}

export default App
