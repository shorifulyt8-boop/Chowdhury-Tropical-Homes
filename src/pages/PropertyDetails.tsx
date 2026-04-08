import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { MapPin, Maximize, Building2, Check, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, addLead } = useProperties();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Property Not Found</h2>
        <Link to="/" className="text-accent font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const formData = new FormData(e.currentTarget);
      await addLead({
        propertyId: property.id,
        propertyName: property.title,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
      });
      setFormStatus('success');
    } catch (err) {
      setFormStatus('idle');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-accent mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Images & Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-accent shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Header Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent mb-3">
                  {property.type}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">{property.title}</h1>
                <div className="flex items-center text-slate-500 mt-2">
                  <MapPin className="w-5 h-5 mr-2 text-accent" />
                  {property.location}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <Maximize className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Area</div>
                  <div className="font-bold text-primary">{property.area} sqft</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Type</div>
                  <div className="font-bold text-primary">{property.type}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Listed</div>
                  <div className="font-bold text-primary">{new Date(property.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold text-primary mb-4">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {property.description}
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
          >
            <h3 className="text-xl font-bold text-primary mb-6">Key Features & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-600">
                  <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Section */}
          {property.mapUrl && property.mapUrl.startsWith('http') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-bold text-primary mb-6">Location Map</h3>
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                  src={property.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Contact Form */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-32"
          >
            <div className="bg-primary text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">Book a Visit</h3>
              
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-primary w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Inquiry Sent!</h4>
                  <p className="text-white/70">Our agent will contact you shortly.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-accent font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/60 mb-1">Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/60 mb-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/60 mb-1">Phone Number</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                      placeholder="+880 1XXX XXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/60 mb-1">Message</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors resize-none"
                      placeholder="I'm interested in this property..."
                    ></textarea>
                  </div>
                  <button
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-primary mb-4">Direct Contact</h4>
              <div className="space-y-4">
                <a href="tel:01720244227" className="flex items-center space-x-3 text-slate-600 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="font-medium">01720 24 42 27</span>
                </a>
                <a href="mailto:chowdhurytropicalhome@gmail.com" className="flex items-center space-x-3 text-slate-600 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="font-medium">chowdhurytropicalhome@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
