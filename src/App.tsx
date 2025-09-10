import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Player from "./components/Player";
// import SpotifyTrackPlayer from "./components/Player1";

import DeezerPlayer from "./components/DeezerPlayer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Search />
      <Footer />
      <Player />
      {/* <SpotifyTrackPlayer /> */}
      <DeezerPlayer />
    </>
  );
}

export default App;
