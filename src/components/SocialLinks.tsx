import { FaYoutube, FaTiktok } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6 mt-12">
      <a
        href="https://instagram.com/resumlyofficial"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <RiInstagramFill className="w-8 h-8 text-gray-600 group-hover:text-pink-500 transition-colors" />
        </div>
      </a>
      
      <a
        href="https://tiktok.com/@resumlyofficial"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <FaTiktok className="w-8 h-8 text-gray-600 group-hover:text-black transition-colors" />
        </div>
      </a>
      
      <a
        href="https://youtube.com/@resumlyofficial"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <FaYoutube className="w-8 h-8 text-gray-600 group-hover:text-red-500 transition-colors" />
        </div>
      </a>
    </div>
  );
} 