import { useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'motion/react';

export default function CategoryPage() {
  const { type } = useParams<{ type: string }>();
  const { properties } = useProperties();
  
  const filteredProperties = properties.filter(p => p.type === type);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">
          {type === 'Flat' ? 'Premium Flats & Apartments' : 'Prime Land & Plots'}
        </h1>
        <p className="text-slate-500">
          Showing {filteredProperties.length} available properties in this category.
        </p>
      </motion.div>

      {filteredProperties.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
        >
          <p className="text-slate-400">No properties found in this category.</p>
        </motion.div>
      )}
    </div>
  );
}
