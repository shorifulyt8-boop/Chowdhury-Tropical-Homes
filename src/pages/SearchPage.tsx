import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'motion/react';
import { Search as SearchIcon, MapPin, Building2, Banknote } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading } = useProperties();

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchLocation = !location || p.location.toLowerCase().includes(location.toLowerCase()) || p.title.toLowerCase().includes(location.toLowerCase());
      const matchType = !type || type === 'Property Type' || p.type === type;
      
      let matchPrice = true;
      if (priceRange && priceRange !== 'Price Range') {
        if (priceRange === 'Under 50 Lac') matchPrice = p.price < 5000000;
        else if (priceRange === '50 Lac - 1 Crore') matchPrice = p.price >= 5000000 && p.price <= 10000000;
        else if (priceRange === '1 Crore - 5 Crore') matchPrice = p.price > 10000000 && p.price <= 50000000;
        else if (priceRange === 'Above 5 Crore') matchPrice = p.price > 50000000;
      }

      return matchLocation && matchType && matchPrice;
    });
  }, [properties, location, type, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ location, type, price: priceRange });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-primary pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"
          >
            Search Results
          </motion.h1>

          <form onSubmit={handleSearch} className="max-w-5xl mx-auto bg-white p-2 md:p-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4">
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
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                className="w-full py-3 outline-none text-slate-700 font-medium bg-transparent"
              >
                <option>Price Range</option>
                <option>Under 50 Lac</option>
                <option>50 Lac - 1 Crore</option>
                <option>1 Crore - 5 Crore</option>
                <option>Above 5 Crore</option>
              </select>
            </div>
            <button type="submit" className="w-full md:w-auto bg-accent text-primary px-10 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center hover:bg-white transition-all shadow-lg">
              <SearchIcon className="w-5 h-5 mr-2" />
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Searching properties...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h2>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">No Properties Found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or location.
                </p>
                <button 
                  onClick={() => { setLocation(''); setType(''); setPriceRange(''); setSearchParams({}); }}
                  className="mt-8 text-accent font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
