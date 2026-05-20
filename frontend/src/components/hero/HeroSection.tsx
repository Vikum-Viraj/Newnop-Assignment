import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center px-4 md:px-8 lg:px-12">
      <div className="space-y-8">
        <div className="inline-block">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            ✨ Track, Manage, Resolve
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Manage Your Issues
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Effortlessly
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed">
          Streamline your workflow with our powerful issue tracking system. 
          Create, organize, and resolve issues with ease while keeping your team in sync.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button 
            onClick={() => navigate('/all-issues')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            Manage Issues →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
