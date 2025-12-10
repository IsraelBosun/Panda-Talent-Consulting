// app/page.js
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSections from './components/FeatureSections';
import SpecializedTalents from './components/SpecializedTalents';
import Footer from './components/Footer'; // Import the new Footer

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <FeatureSections />
      <SpecializedTalents />
      <Footer />
    </main>
  );
}