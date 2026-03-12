import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import OutfitCard from './OutfitCard';
import { Outfit } from '../types';

interface WishlistPageProps {
  outfits: Outfit[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onNavigate: (page: 'home' | 'wishlist' | 'admin') => void;
}

export default function WishlistPage({ outfits, wishlist, onToggleWishlist, onNavigate }: WishlistPageProps) {
  const wishlistedOutfits = outfits.filter((outfit) => wishlist.includes(outfit.id));

  return (
    <div className="min-h-[80vh] py-16 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              My Wishlist
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              {wishlistedOutfits.length} items saved for later
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Continue Browsing
          </button>
        </div>

        {wishlistedOutfits.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 italic">Your wishlist is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg font-medium leading-relaxed">
              Explore our collection and save your favorite outfits to see them here later!
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:bg-black transition-all active:scale-[0.98]"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlistedOutfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
