import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";
import MovieFeed from "./components/MovieFeed";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MovieFeed />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
