import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Send, CheckCircle2 } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function Contact() {
  const { addLead } = useProperties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      propertyId: 'general-inquiry',
      propertyName: 'General Inquiry',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      await addLead(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-primary pt-32 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">Contact Us</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-white/60 max-w-2xl mx-auto">
            Have questions? We're here to help you find your dream home or land plot.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <MapPin className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Office Address</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    153 south Madartek, Basabo, Sabujbag dhaka
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <Phone className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Phone Numbers</h3>
                  <p className="text-slate-500 text-sm">01720 24 42 27</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <Mail className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Email Address</h3>
                  <p className="text-slate-500 text-sm break-all">chowdhurytropicalhome@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <Facebook className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Follow Us</h3>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61570015629829" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent font-medium hover:underline text-sm"
                  >
                    Facebook Profile
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 h-full">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-500 w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Message Sent!</h2>
                    <p className="text-slate-500">Thank you for reaching out. We'll get back to you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-primary mb-8">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase">Full Name</label>
                        <input required name="name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase">Phone Number</label>
                        <input required name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors" placeholder="+880 1XXX XXXXXX" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase">Email Address</label>
                      <input required name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase">Your Message</label>
                      <textarea required name="message" rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
