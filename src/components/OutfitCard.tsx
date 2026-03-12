import { Heart, ExternalLink, Shirt, Scissors, Footprints } from 'lucide-react';
import { Outfit } from '../types';

interface OutfitCardProps {
  outfit: Outfit;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function OutfitCard({ outfit, isWishlisted, onToggleWishlist }: OutfitCardProps) {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={outfit.image_url}
          alt={outfit.title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
            {outfit.color}
          </span>
          <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
            {outfit.occasion}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight line-clamp-1">
          {outfit.title}
        </h3>

        <div className="space-y-2 mb-8">
          {[
            { label: 'Shirt', link: outfit.shirt_link, icon: Shirt },
            { label: 'Pants', link: outfit.pants_link, icon: Scissors },
            { label: 'Shoes', link: outfit.shoes_link, icon: Footprints },
          ].map((item) => (
            item.link && (
              <a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group/link"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-700" />
                  <span className="font-bold text-gray-700">{item.label}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-gray-900 transition-colors" />
              </a>
            )
          ))}
        </div>

        <button
          onClick={() => onToggleWishlist(outfit.id)}
          className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 hover:bg-red-100 shadow-inner'
              : 'bg-white border-2 border-gray-100 text-gray-900 hover:border-gray-900 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>
    </div>
  );
}
