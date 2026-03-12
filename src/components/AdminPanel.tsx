import { Plus, LogOut, LayoutGrid, Trash2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Outfit } from '../types';

interface AdminPanelProps {
  outfits: Outfit[];
  onAddOutfit: (outfit: Omit<Outfit, 'id'>) => Promise<boolean>;
  onDeleteOutfit: (id: string) => void;
  onNavigate: (page: 'home' | 'wishlist' | 'admin') => void;
}

export default function AdminPanel({ outfits, onAddOutfit, onDeleteOutfit, onNavigate }: AdminPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    occasion: 'Casual',
    color: 'Black',
    image_url: '',
    shirt_link: '',
    pants_link: '',
    shoes_link: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onAddOutfit(formData);
    
    if (success) {
      setFormData({
        title: '',
        occasion: 'Casual',
        color: 'Black',
        image_url: '',
        shirt_link: '',
        pants_link: '',
        shoes_link: '',
        description: '',
      });
      setShowForm(false);
    }
  };

  const colorOptions = ['Black', 'White', 'Blue', 'Green', 'Red', 'Yellow'];
  const occasionOptions = ['Casual', 'Formal', 'Traditional', 'Party Wear'];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white shadow-lg">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Dashboard</h2>
            </div>

            <nav className="space-y-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md group">
                <LayoutGrid className="w-5 h-5 opacity-70" />
                Manage Outfits
              </button>
              
              <button
                onClick={() => setShowForm(!showForm)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  showForm ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Plus className="w-5 h-5" />
                {showForm ? 'Cancel Adding' : 'Add New Outfit'}
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-all"
              >
                <LogOut className="w-5 h-5 rotate-180" />
                Back to Site
              </button>

            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {showForm ? (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Add New Outfit</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Outfit Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Summer Linen Core"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Color</label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium"
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Occasion</label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium"
                    >
                      {occasionOptions.map((occasion) => (
                        <option key={occasion} value={occasion}>{occasion}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Image URL (Unsplash)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Shirt Link</label>
                    <input
                      type="url"
                      placeholder="https://zara.com/..."
                      value={formData.shirt_link}
                      onChange={(e) => setFormData({ ...formData, shirt_link: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium text-sm placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Pants Link</label>
                    <input
                      type="url"
                      placeholder="https://hm.com/..."
                      value={formData.pants_link}
                      onChange={(e) => setFormData({ ...formData, pants_link: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium text-sm placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Shoes Link</label>
                    <input
                      type="url"
                      placeholder="https://nike.com/..."
                      value={formData.shoes_link}
                      onChange={(e) => setFormData({ ...formData, shoes_link: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium text-sm placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Description (Optional)</label>
                  <textarea
                    placeholder="Brief style note..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium placeholder-gray-400 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gray-900 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:bg-black transition-all font-black text-lg active:scale-[0.98]"
                  >
                    Save Outfit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-10 py-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all font-bold"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Active Collection</h3>
                  <p className="text-gray-500 font-medium">Manage and monitor all your outfits</p>
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-black">
                  {outfits.length} Outfits Total
                </div>
              </div>

              <div className="overflow-hidden bg-gray-50 rounded-3xl border border-gray-100">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-100">
                      <th className="text-left py-5 px-6 font-black text-gray-400 text-xs uppercase tracking-widest">Image</th>
                      <th className="text-left py-5 px-6 font-black text-gray-400 text-xs uppercase tracking-widest">Details</th>
                      <th className="text-left py-5 px-6 font-black text-gray-400 text-xs uppercase tracking-widest">Type</th>
                      <th className="text-center py-5 px-6 font-black text-gray-400 text-xs uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {outfits.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <ImageIcon className="w-12 h-12 text-gray-200" />
                            <p className="font-bold text-gray-400">Your collection is empty</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      outfits.map((outfit) => (
                        <tr key={outfit.id} className="hover:bg-white transition-colors group">
                          <td className="py-5 px-6">
                            <div className="relative w-20 h-24 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                              <img
                                src={outfit.image_url}
                                alt={outfit.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <p className="font-black text-gray-900 text-lg mb-1">{outfit.title}</p>
                            <p className="text-sm font-medium text-gray-400 line-clamp-1 italic">{outfit.description || 'No description provided'}</p>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-black text-gray-900 shadow-sm w-fit">
                                {outfit.color}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-gray-500 w-fit">
                                {outfit.occasion}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => onDeleteOutfit(outfit.id)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm hover:shadow-md opacity-40 group-hover:opacity-100"
                                title="Delete Outfit"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
