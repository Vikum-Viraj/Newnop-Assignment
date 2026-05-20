import HeroSection from '../components/hero/HeroSection';
import FeaturesSection from '../components/hero/FeaturesSection';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="py-20">
        <HeroSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Hero;
