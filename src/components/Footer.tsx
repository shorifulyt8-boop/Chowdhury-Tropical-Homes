import { useProperties } from '../context/PropertyContext';
import { Building2, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const { settings } = useProperties();

  return (
    <footer className="bg-primary text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-6 justify-center sm:justify-start">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ perspective: 1000 }}
            >
              {settings?.site_logo ? (
                <img 
                  src={settings.site_logo} 
                  alt="Logo" 
                  className="h-10 w-auto object-contain" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <div className="w-10 h-10 navy-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Building2 className="text-accent w-6 h-6" />
                </div>
              )}
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              CHOWDHURY<span className="text-accent"> TROPICAL HOMES</span>
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6 text-center sm:text-left">
            Leading construction and real estate company in Dhaka, providing quality housing solutions and land management services.
          </p>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61570015629829" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 p-2.5 rounded-xl hover:bg-accent hover:text-primary transition-all group"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold mb-6 text-accent">Our Services</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start justify-center sm:justify-start">
              <span className="text-accent mr-2">•</span>
              জমি শেয়ার সহ ফ্ল্যাট বিক্রি
            </li>
            <li className="flex items-start justify-center sm:justify-start">
              <span className="text-accent mr-2">•</span>
              রেডি ফ্ল্যাট ও রেডি বাড়ি বিক্রি
            </li>
            <li className="flex items-start justify-center sm:justify-start">
              <span className="text-accent mr-2">•</span>
              জমি বিক্রি
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="/category/Flat" className="hover:text-accent transition-colors">Apartments</a></li>
            <li><a href="/category/Land" className="hover:text-accent transition-colors">Land Plots</a></li>
            <li><a href="/contact" className="hover:text-accent transition-colors">Contact Us</a></li>
            <li><a href="/admin" className="hover:text-accent transition-colors">Admin Portal</a></li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold mb-6 text-accent">Contact Info</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start space-x-3 justify-center sm:justify-start">
              <div className="mt-1 bg-accent/10 p-1.5 rounded-md flex-shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span>153 south Madartek, Basabo, Sabujbag dhaka</span>
            </li>
            <li className="flex items-start space-x-3 justify-center sm:justify-start">
              <div className="mt-1 bg-accent/10 p-1.5 rounded-md flex-shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span>01720 24 42 27</span>
            </li>
            <li className="flex items-start space-x-3 justify-center sm:justify-start">
              <div className="mt-1 bg-accent/10 p-1.5 rounded-md flex-shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="break-all">chowdhurytropicalhome@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 text-center md:text-left">
        <p>© 2026 Chowdhury Tropical Homes. All rights reserved.</p>
        <p className="font-medium">Developed Design And Maintenance By <span className="text-accent">Shoriful Islam</span></p>
      </div>
    </footer>
  );
}
