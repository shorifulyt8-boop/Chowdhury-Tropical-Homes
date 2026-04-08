import React from 'react';
import { Property } from '../context/PropertyContext';
import { MapPin, Maximize, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
    >
      <Link to={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
            property.type === 'Flat' ? 'bg-primary text-white' : 'bg-accent text-primary'
          }`}>
            {property.type}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-primary line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-accent" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-slate-50 mb-4">
          <div className="flex items-center space-x-2">
            <Maximize className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">{property.area} sqft</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">
              {property.type === 'Flat' ? 'Apartment' : 'Plot'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            {formatPrice(property.price)}
          </div>
          <Link
            to={`/property/${property.id}`}
            className="flex items-center text-sm font-bold text-accent hover:text-primary transition-colors"
          >
            Details <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
