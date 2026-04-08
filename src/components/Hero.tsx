import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Building2, Banknote } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const { settings } = useProperties();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Property Type');
  const [price, setPrice] = useState('Price Range');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type !== 'Property Type') params.append('type', type);
    if (price !== 'Price Range') params.append('price', price);
    
    navigate(`/search?${params.toString()}`);
  };

  const SLIDES = [
    {
      image: settings?.hero_image_1 || 'https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&w=1920&q=80',
      title: settings?.hero_title_1 || 'Find Your Dream Home',
      subtitle: settings?.hero_subtitle_1 || 'Discover premium flats and apartments in prime locations.'
    },
    {
      image: settings?.hero_image_2 || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
      title: settings?.hero_title_2 || 'Invest in Prime Land',
      subtitle: settings?.hero_subtitle_2 || 'Secure your future with high-value residential and commercial plots.'
    },
    {
      image: settings?.hero_image_3 || 'https://images.unsplash.com/photo-1600607687940-c52af036999b?auto=format&fit=crop&w=1920&q=80',
      title: settings?.hero_title_3 || 'Luxury Living Redefined',
      subtitle: settings?.hero_subtitle_3 || 'Experience the pinnacle of comfort and elegance.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={SLIDES[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
            {SLIDES[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            {SLIDES[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white p-2 md:p-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100">
              <MapPin className="text-accent w-5 h-5 mr-3" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Location (e.g. Gulshan, Banani)"
                className="w-full py-3 outline-none text-slate-700 font-medium"
              />
            </div>
            <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100">
              <Building2 className="text-accent w-5 h-5 mr-3" />
              <select 
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full py-3 outline-none text-slate-700 font-medium bg-transparent"
              >
                <option>Property Type</option>
                <option value="Flat">Flat / Apartment</option>
                <option value="Land">Land / Plot</option>
              </select>
            </div>
            <div className="flex-1 w-full flex items-center px-4">
              <Banknote className="text-accent w-5 h-5 mr-3" />
              <select 
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full py-3 outline-none text-slate-700 font-medium bg-transparent"
              >
                <option>Price Range</option>
                <option>Under 50 Lac</option>
                <option>50 Lac - 1 Crore</option>
                <option>1 Crore - 5 Crore</option>
                <option>Above 5 Crore</option>
              </select>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center hover:bg-opacity-90 transition-all shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx ? 'bg-accent w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
