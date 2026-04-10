import { useProperties } from '../context/PropertyContext';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import Building3D from '../components/Building3D';
import { motion } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Trophy, Users, Building2, 
  Home as HomeIcon, Key, Map, Search, CheckCircle, Quote,
  Star, Clock, Heart, Move3d
} from 'lucide-react';
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

  const services = [
    {
      title: 'Property Management',
      description: 'We handle everything from maintenance to tenant relations, ensuring your investment is well-protected.',
      icon: HomeIcon,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Land Development',
      description: 'Expert guidance on land acquisition and development strategies for maximum ROI.',
      icon: Map,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Consultation',
      description: 'Professional real estate advice to help you make informed decisions in the Dhaka market.',
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Legal Support',
      description: 'Complete assistance with documentation, registration, and legal verification of properties.',
      icon: ShieldCheck,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Zubayer',
      role: 'Home Owner',
      content: 'Chowdhury Tropical Homes helped me find the perfect flat in Banani. Their professionalism and transparency are unmatched.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?u=ahmed'
    },
    {
      name: 'Farhana Rahman',
      role: 'Investor',
      content: 'I have purchased multiple land plots through them. Their market knowledge and legal support made the process seamless.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?u=farhana'
    },
    {
      name: 'Kamrul Hasan',
      role: 'Business Owner',
      content: 'Excellent service! They understood my requirements perfectly and showed me options that were exactly what I needed.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?u=kamrul'
    }
  ];

  const steps = [
    { title: 'Search Property', description: 'Browse our extensive list of flats and land plots.', icon: Search },
    { title: 'Visit & Inspect', description: 'Schedule a visit to see the property in person.', icon: Map },
    { title: 'Legal Check', description: 'We verify all documents for your peace of mind.', icon: ShieldCheck },
    { title: 'Close the Deal', description: 'Finalize the paperwork and get your keys.', icon: Key }
  ];

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      <Hero />

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          {...fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Properties</h2>
            <p className="text-slate-500 max-w-xl">
              Explore our hand-picked selection of premium flats and prime land plots available for sale.
            </p>
          </div>
          <Link
            to="/category/Flat"
            className="flex items-center text-accent font-bold hover:text-primary transition-colors"
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

      {/* 3D Building Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
              Interactive 3D View
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Experience Our <span className="text-accent">Architecture</span> in 3D
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Touch and rotate the building to explore our modern architectural designs. We bring innovation to every corner of your future home.
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <Move3d className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Rotate with Mouse/Touch</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner overflow-hidden"
          >
            <Building3D />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Building" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-accent p-10 rounded-[2.5rem] shadow-2xl hidden md:block max-w-xs">
              <div className="text-primary font-bold text-4xl mb-2">15+</div>
              <div className="text-primary/80 font-medium">Years of excellence in the real estate industry.</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
              About Our Company
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              We Help You Find Your <span className="text-accent">Dream Space</span> in Dhaka
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Chowdhury Tropical Homes is a leading real estate and construction firm dedicated to providing high-quality housing solutions. With over 15 years of experience, we specialize in luxury flats and prime land plots across Dhaka.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Trusted Agency', icon: ShieldCheck },
                { title: 'Expert Guidance', icon: Users },
                { title: 'Legal Security', icon: CheckCircle },
                { title: 'Prime Locations', icon: Map },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <item.icon className="text-accent w-5 h-5" />
                  </div>
                  <span className="font-bold text-primary">{item.title}</span>
                </div>
              ))}
            </div>
            <Link 
              to="/about" 
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl"
            >
              Learn More About Us <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Our Premium Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We provide a comprehensive range of real estate services tailored to meet the unique needs of our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mt-48 blur-3xl" />
          
          <motion.div {...fadeInUp} className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our simple four-step process makes finding and buying your next property a breeze.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center space-y-4 relative">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-accent/40 to-transparent" />
                )}
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 group hover:bg-accent transition-colors">
                  <step.icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Browse by Category</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
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
            <Link to="/category/Flat" className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl block">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
                alt="Flats"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Flats & Apartments</h3>
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
            <Link to="/category/Land" className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl block">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Land"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Land & Plots</h3>
                <p className="text-white/70 mb-6">Invest in prime real estate with high growth potential.</p>
                <div className="flex items-center text-accent font-bold">
                  Explore Land <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">What Our Clients Say</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative"
              >
                <Quote className="absolute top-8 right-8 text-accent/20 w-12 h-12" />
                <div className="flex space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-accent/20" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-primary">{t.name}</h4>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
