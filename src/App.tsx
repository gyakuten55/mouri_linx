import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Authority } from "./sections/Authority";
import { Books } from "./sections/Books";
import { BusinessPortfolio } from "./sections/BusinessPortfolio";
import { CityBanner } from "./sections/CityBanner";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { YouTubeLatest } from "./sections/YouTubeLatest";

export function App() {
  useEffect(() => {
    if (window.location.pathname === "/consultation") {
      window.history.replaceState(null, "", "/#contact");
    }
    const target = document.getElementById(window.location.hash.slice(1));
    if (target)
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "instant" }),
      );
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <CityBanner />
        <YouTubeLatest />
        <Authority />
        <Books />
        <BusinessPortfolio />
        <Contact />
      </main>
    </>
  );
}
