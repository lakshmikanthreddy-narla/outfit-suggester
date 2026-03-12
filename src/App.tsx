import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import OutfitCard from './components/OutfitCard';
import WishlistPage from './components/WishlistPage';
import AdminModal from './components/AdminModal';
import AdminPanel from './components/AdminPanel';
import { Shirt, RotateCcw, Trash2 } from 'lucide-react';
import { Outfit } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'wishlist' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('outfit-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutfits();
  }, []);

  useEffect(() => {
    localStorage.setItem('outfit-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  async function fetchOutfits() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOutfits(data || []);
    } catch (error) {
      console.error('Error fetching outfits:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddOutfit = async (newOutfit: Omit<Outfit, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('outfits')
        .insert([newOutfit])
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setOutfits(prev => [data[0], ...prev]);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error adding outfit:', error);
      alert(`Failed to add outfit: ${error.message || 'Unknown error'}`);
      return false;
    }
  };

  const handleDeleteOutfit = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this outfit?')) return;

    try {
      const { error } = await supabase
        .from('outfits')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setOutfits(prev => prev.filter(o => o.id !== id));
      setWishlist(prev => prev.filter(itemId => itemId !== id));
    } catch (error: any) {
      console.error('Error deleting outfit:', error);
      alert(`Failed to delete outfit: ${error.message || 'Unknown error'}`);
    }
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleNavigate = (page: 'home' | 'wishlist' | 'admin') => {
    if (page === 'admin') {
      if (isAdmin) {
        setCurrentPage('admin');
      } else {
        setShowAdminModal(true);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const filteredOutfits = outfits.filter(outfit => {
    const occasionMatch = !selectedOccasion || outfit.occasion.toLowerCase() === selectedOccasion.toLowerCase();
    const colorMatch = !selectedColor || outfit.color.toLowerCase() === selectedColor.toLowerCase();
    return occasionMatch && colorMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero
              selectedOccasion={selectedOccasion}
              selectedColor={selectedColor}
              onOccasionChange={setSelectedOccasion}
              onColorChange={setSelectedColor}
            />

            <div className="max-w-7xl mx-auto px-6 py-10">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-[2rem] h-[600px] animate-pulse border border-gray-100 shadow-sm"></div>
                  ))}
                </div>
              ) : (
                <>
                  {!selectedColor || !selectedOccasion ? (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto px-10">
                      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Shirt className="w-12 h-12 text-indigo-600 animate-bounce" />
                      </div>
                      <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Find Your Perfect Look</h3>
                      <p className="text-gray-500 text-xl font-medium max-w-lg mx-auto leading-relaxed">
                        Please select an <span className="text-indigo-600">occasion</span> and a <span className="text-indigo-600">color</span> in the hero section above to see our curated outfit recommendations.
                      </p>
                    </div>
                  ) : filteredOutfits.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">No outfits found for "{selectedColor}" and "{selectedOccasion}".</p>
                      <button onClick={fetchOutfits} className="mt-4 text-indigo-600 font-bold underline">Refresh Database</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div>
                          <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Curated Outfits For You</h3>
                          <p className="text-gray-500 font-medium">
                            Showing {filteredOutfits.length} matching outfit(s) for {selectedColor} {selectedOccasion}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={fetchOutfits}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl font-bold transition-all border border-gray-200 group"
                          >
                            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Refresh
                          </button>
                          <button
                            onClick={() => {
                              setSelectedColor('');
                              setSelectedOccasion('');
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all border border-red-100 shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Clear Results
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredOutfits.map((outfit) => (
                          <OutfitCard
                            key={outfit.id}
                            outfit={outfit}
                            isWishlisted={wishlist.includes(outfit.id)}
                            onToggleWishlist={handleToggleWishlist}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            outfits={outfits}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && isAdmin && (
          <AdminPanel
            outfits={outfits}
            onAddOutfit={handleAddOutfit}
            onDeleteOutfit={handleDeleteOutfit}
            onNavigate={(page: any) => setCurrentPage(page)}
          />
        )}
      </main>

      {showAdminModal && (
        <AdminModal
          onClose={() => setShowAdminModal(false)}
          onAccessGranted={() => {
            setIsAdmin(true);
            setShowAdminModal(false);
            setCurrentPage('admin');
          }}
        />
      )}
    </div>
  );
}

export default App;