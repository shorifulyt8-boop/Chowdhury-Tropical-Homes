import { motion } from 'motion/react';
import { Target, Eye, CheckCircle2, Building2, Landmark, HardHat, Home } from 'lucide-react';

export default function AboutUs() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="About Us Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-accent font-medium"
          >
            Defining Elegance, Delivering Comfort
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              CHOWDHURY TROPICAL HOMES is a premier name in the real estate and construction industry, dedicated to transforming the landscape of modern living. We believe that a home is more than just a structure of bricks and mortar; it is a sanctuary where memories are built.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              With a blend of architectural excellence and a commitment to quality, we strive to create spaces that offer both luxury and tranquility. At CHOWDHURY TROPICAL HOMES, we don’t just build houses; we build your future.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
              alt="Our Office" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            {...fadeInUp}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to provide high-quality, sustainable, and innovative housing solutions that cater to the evolving needs of modern families. We are committed to using premium materials and cutting-edge engineering to ensure that every project we deliver stands the test of time.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become a leader in the real estate sector by setting new benchmarks in integrity, design, and customer satisfaction, making world-class living accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Us?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We set ourselves apart through our commitment to excellence and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Architectural Excellence",
              desc: "Our designs prioritize the 'Tropical' essence—ensuring ample natural light, ventilation, and a harmonious connection with nature."
            },
            {
              title: "Uncompromising Quality",
              desc: "From the foundation to the finishing touches, we use international-standard construction materials and rigorous quality control."
            },
            {
              title: "Legal Transparency",
              desc: "We ensure 100% transparency in land titles, government approvals, and documentation, providing you with a secure investment."
            },
            {
              title: "Timely Delivery",
              desc: "We value your time. Our project management team works tirelessly to ensure that every key is handed over on the promised date."
            },
            {
              title: "Customer-Centric Approach",
              desc: "Your satisfaction is our reward. We offer personalized services and comprehensive after-sales support for a seamless transition."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="flex space-x-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="text-accent w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Residential Development", icon: Home, desc: "Crafting luxury apartments and cozy family homes." },
              { title: "Commercial Construction", icon: Building2, desc: "Designing and building state-of-the-art commercial spaces." },
              { title: "Land Development", icon: Landmark, desc: "Developing premium plots with modern infrastructure." },
              { title: "Construction Consultancy", icon: HardHat, desc: "Providing expert engineering and architectural solutions." }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <service.icon className="text-accent w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div {...fadeInUp}>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Join us in our journey to create a more beautiful and comfortable tomorrow.
          </p>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
        </motion.div>
      </section>
    </div>
  );
}
