import { ChevronDown, Palette } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  selectedOccasion: string;
  selectedColor: string;
  onOccasionChange: (occasion: string) => void;
  onColorChange: (color: string) => void;
}

const occasions = ['Casual', 'Formal', 'Traditional', 'Party Wear'];
const colors = [
  { name: 'Black', hex: '#0f172a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#059669' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Yellow', hex: '#f7b905' },
];

export default function Hero({ selectedOccasion, selectedColor, onOccasionChange, onColorChange }: HeroProps) {
  const [occasionOpen, setOccasionOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0f172a] rounded-[2.5rem] p-16 text-center shadow-2xl relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
              Find Your Perfect Outfit
            </h1>
            <p className="text-gray-400 text-xl mb-12 font-medium">
              Select an occasion and color preference
            </p>

            <div className="max-w-xl mx-auto space-y-5">
              <div className="relative">
                <button
                  onClick={() => {
                    setOccasionOpen(!occasionOpen);
                    setColorOpen(false);
                  }}
                  className="w-full bg-[#1e293b]/50 backdrop-blur-md text-white py-5 px-8 rounded-2xl flex items-center justify-between hover:bg-[#1e293b] border border-gray-700/50 transition-all group"
                >
                  <span className="text-lg font-medium">
                    {selectedOccasion || 'Select an occasion'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-white transition-transform ${occasionOpen ? 'rotate-180' : ''}`} />
                </button>

                {occasionOpen && (
                  <div className="absolute top-full mt-3 w-full bg-white rounded-3xl p-6 shadow-2xl z-50 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="grid grid-cols-2 gap-4">
                      {occasions.map((occasion) => (
                        <button
                          key={occasion}
                          onClick={() => {
                            onOccasionChange(occasion);
                            setOccasionOpen(false);
                          }}
                          className={`py-4 px-6 rounded-2xl text-lg font-bold transition-all ${
                            selectedOccasion === occasion
                              ? 'bg-[#0f172a] text-white shadow-xl scale-[1.02]'
                              : 'bg-white border-2 border-gray-100 text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {occasion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setColorOpen(!colorOpen);
                    setOccasionOpen(false);
                  }}
                  className="w-full bg-[#1e293b]/50 backdrop-blur-md text-white py-5 px-8 rounded-2xl flex items-center justify-between hover:bg-[#1e293b] border border-gray-700/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    <span className="text-lg font-medium">
                      {selectedColor || 'Select a color'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-white transition-transform ${colorOpen ? 'rotate-180' : ''}`} />
                </button>

                {colorOpen && (
                  <div className="absolute top-full mt-3 w-full bg-white rounded-3xl p-8 shadow-2xl z-50 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex items-center justify-center gap-6 pb-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => {
                            onColorChange(color.name);
                            setColorOpen(false);
                          }}
                          className={`w-16 h-16 rounded-full transition-all hover:scale-110 relative ${
                            selectedColor === color.name 
                              ? 'ring-4 ring-blue-500 ring-offset-4 scale-110 shadow-lg' 
                              : 'shadow-md border border-gray-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {color.name === 'White' && (
                            <div className="w-full h-full rounded-full border border-gray-200"></div>
                          )}
                          {selectedColor === color.name && (
                            <div className="absolute inset-0 rounded-full bg-black/5"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
