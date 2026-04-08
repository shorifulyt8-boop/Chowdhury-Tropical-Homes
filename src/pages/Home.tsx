import { useProperties } from '../context/PropertyContext';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Trophy, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { properties } = useProperties();
  const featuredProperties = properties.slice(0, 6);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <Hero />

      {/* Stats Section */}
      <motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          {[
            { label: 'Properties Sold', value: '1,200+', icon: Trophy },
            { label: 'Happy Clients', value: '5,000+', icon: Users },
            { label: 'Years Experience', value: '15+', icon: ShieldCheck },
            { label: 'Expert Agents', value: '50+', icon: Building2 },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-accent w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          {...fadeInUp}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Properties</h2>
            <p className="text-slate-500 max-w-xl">
              Explore our hand-picked selection of premium flats and prime land plots available for sale.
            </p>
          </div>
          <Link
            to="/category/Flat"
            className="hidden md:flex items-center text-accent font-bold hover:text-primary transition-colors"
          >
            View All Properties <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="bg-primary py-24 text-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Browse by Category</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Whether you're looking for a luxury apartment or a strategic land plot, we have the perfect options for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/category/Flat" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl block">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
                  alt="Flats"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold mb-2">Flats & Apartments</h3>
                  <p className="text-white/70 mb-6">Discover modern living spaces in the heart of the city.</p>
                  <div className="flex items-center text-accent font-bold">
                    Explore Flats <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/category/Land" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl block">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                  alt="Land"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold mb-2">Land & Plots</h3>
                  <p className="text-white/70 mb-6">Invest in prime real estate with high growth potential.</p>
                  <div className="flex items-center text-accent font-bold">
                    Explore Land <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="navy-gradient rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Find Your Perfect Property?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
              Our expert agents are ready to help you navigate the real estate market and find the best deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/category/Flat"
                className="w-full sm:w-auto bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl"
              >
                Browse Listings
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Contact Agent
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
