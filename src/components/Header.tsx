import { Heart, Shirt } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'wishlist' | 'admin') => void;
  currentPage: 'home' | 'wishlist' | 'admin';
  wishlistCount: number;
}

export default function Header({ onNavigate, currentPage, wishlistCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <Shirt className="w-8 h-8 text-gray-900" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">OutfitMatch</span>
        </div>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`text-base font-medium transition-colors ${
              currentPage === 'home' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('wishlist')}
            className={`flex items-center gap-2 text-base font-medium transition-colors ${
              currentPage === 'wishlist' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
            }`}
          >
            <div className="relative">
              <Heart className={`w-5 h-5 ${currentPage === 'wishlist' ? 'fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span>Wishlist</span>
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-6 py-2 rounded-xl text-base font-medium transition-all ${
              currentPage === 'admin'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
