import React, { useState } from 'react';
import { useProperties, Property, PropertyType } from '../context/PropertyContext';
import { 
  LayoutDashboard, Plus, LogOut, Trash2, Edit, MessageSquare, Building2, X, Mail, Phone, Settings as SettingsIcon, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'leads' | 'settings'>('listings');
  const { properties, leads, settings, loading, addProperty, deleteProperty, updateProperty, updateSetting, uploadImage } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Settings state
  const [heroSettings, setHeroSettings] = useState({
    hero_image_1: '',
    hero_title_1: '',
    hero_subtitle_1: '',
    hero_image_2: '',
    hero_title_2: '',
    hero_subtitle_2: '',
    hero_image_3: '',
    hero_title_3: '',
    hero_subtitle_3: '',
    site_logo: '',
  });

  // Sync settings when they are loaded from context
  React.useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setHeroSettings({
        hero_image_1: settings.hero_image_1 || '',
        hero_title_1: settings.hero_title_1 || '',
        hero_subtitle_1: settings.hero_subtitle_1 || '',
        hero_image_2: settings.hero_image_2 || '',
        hero_title_2: settings.hero_title_2 || '',
        hero_subtitle_2: settings.hero_subtitle_2 || '',
        hero_image_3: settings.hero_image_3 || '',
        hero_title_3: settings.hero_title_3 || '',
        hero_subtitle_3: settings.hero_subtitle_3 || '',
        site_logo: settings.site_logo || '',
      });
    }
  }, [settings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Chowdhury' && password === 'Chowdhury321') setIsLoggedIn(true);
    else alert('Invalid credentials');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucket: string) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    try {
      return await uploadImage(file, bucket);
    } catch (err) {
      alert('Upload failed. Make sure you have created the storage bucket and set permissions.');
      return null;
    }
  };

  const handleSaveProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      const formData = new FormData(form);
      const images: string[] = [];

      // Handle 3 images
      for (let i = 1; i <= 3; i++) {
        const urlInput = formData.get(`image${i}`) as string;
        const fileInput = form.querySelector(`input[name="file${i}"]`) as HTMLInputElement;
        
        let finalUrl = urlInput;
        if (fileInput?.files?.[0]) {
          const uploadedUrl = await uploadImage(fileInput.files[0], 'properties');
          if (uploadedUrl) finalUrl = uploadedUrl;
        }
        
        if (finalUrl) images.push(finalUrl);
      }

      const rawMapUrl = formData.get('mapUrl') as string;
      let mapUrl = rawMapUrl;
      
      // If user pastes the whole iframe tag, extract the src URL
      if (rawMapUrl.includes('<iframe')) {
        const match = rawMapUrl.match(/src="([^"]+)"/);
        if (match && match[1]) {
          mapUrl = match[1];
        }
      }

      const data = {
        title: formData.get('title') as string,
        type: formData.get('type') as PropertyType,
        price: Number(formData.get('price')),
        location: formData.get('location') as string,
        area: Number(formData.get('area')),
        description: formData.get('description') as string,
        images: images.length > 0 ? images : ['https://picsum.photos/seed/property/800/600'],
        features: (formData.get('features') as string).split(',').map(s => s.trim()),
        mapUrl: mapUrl,
      };
      editingProperty ? await updateProperty(editingProperty.id, data) : await addProperty(data);
      setIsModalOpen(false);
      setEditingProperty(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (propertyToDelete) {
      setIsSubmitting(true);
      try {
        await deleteProperty(propertyToDelete);
        setIsDeleteConfirmOpen(false);
        setPropertyToDelete(null);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      for (const [key, value] of Object.entries(heroSettings)) {
        await updateSetting(key, value);
      }
      alert('Settings updated successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, num: number) => {
    const url = await handleFileUpload(e, 'hero');
    if (url) {
      setHeroSettings(prev => ({ ...prev, [`hero_image_${num}`]: url }));
    }
  };

  if (!isLoggedIn) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ perspective: 1000 }}
            className="w-16 h-16 navy-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Building2 className="text-accent w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-primary">Admin Login</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none focus:border-accent" placeholder="Username" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none focus:border-accent" placeholder="Password" />
          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl">Sign In</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-primary text-white hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 mb-12">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ perspective: 1000 }}
          >
            <Building2 className="text-accent w-8 h-8" />
          </motion.div>
          <span className="text-xl font-bold uppercase">CT HOMES ADMIN</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('listings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'listings' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/10'}`}><LayoutDashboard className="w-5 h-5" /><span>Listings</span></button>
          <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'leads' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/10'}`}><MessageSquare className="w-5 h-5" /><span>Leads</span></button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'settings' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/10'}`}><SettingsIcon className="w-5 h-5" /><span>Settings</span></button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"><LogOut className="w-5 h-5" /><span>Logout</span></button>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-primary">
            {activeTab === 'listings' ? 'Property Listings' : activeTab === 'leads' ? 'Inquiry Leads' : 'Site Settings'}
          </h1>
          {activeTab === 'listings' && <button onClick={() => { setEditingProperty(null); setIsModalOpen(true); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg"><Plus className="w-5 h-5 mr-2" /> Add Property</button>}
        </header>

        {activeTab === 'listings' ? (
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr><th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Property</th><th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Type</th><th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Price</th><th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 flex items-center space-x-3"><img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" /><span className="font-bold text-primary">{p.title}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${p.type === 'Flat' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{p.type}</span></td>
                    <td className="px-6 py-4 font-medium">{(p.price / 100000).toFixed(1)} Lac</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button onClick={() => { setEditingProperty(p); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-accent">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => { setPropertyToDelete(p.id); setIsDeleteConfirmOpen(true); }} className="p-2 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="p-10 text-center text-slate-400">Loading properties...</div>}
            {!loading && properties.length === 0 && <div className="p-10 text-center text-slate-400">No properties found.</div>}
          </div>
        ) : activeTab === 'leads' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.map(l => (
              <div key={l.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between mb-4"><h3 className="font-bold text-primary text-lg">{l.name}</h3><span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">{l.propertyName}</span></div>
                <div className="space-y-1 mb-4 text-sm text-slate-600">
                  <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {l.email}</div>
                  <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {l.phone}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-sm italic">"{l.message}"</div>
              </div>
            ))}
            {loading && <div className="col-span-full text-center text-slate-400">Loading leads...</div>}
            {!loading && leads.length === 0 && <div className="col-span-full text-center text-slate-400">No leads found.</div>}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 max-w-4xl">
            <form onSubmit={handleSaveSettings} className="space-y-10">
              {/* Site Identity */}
              <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-bold text-primary">Site Identity</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Site Logo</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={heroSettings.site_logo} 
                      onChange={e => setHeroSettings(prev => ({ ...prev, site_logo: e.target.value }))}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-accent" 
                      placeholder="Logo URL" 
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="logo-upload" 
                        onChange={async (e) => {
                          const url = await handleFileUpload(e, 'hero');
                          if (url) setHeroSettings(prev => ({ ...prev, site_logo: url }));
                        }} 
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer bg-accent/10 text-accent p-3 rounded-xl hover:bg-accent/20 transition-colors flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </label>
                    </div>
                  </div>
                  {heroSettings.site_logo && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-slate-100 inline-block">
                      <img src={heroSettings.site_logo} alt="Logo Preview" className="h-12 object-contain" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hero Slides */}
              {[1, 2, 3].map(num => (
                <div key={num} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-primary">Hero Slide {num}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Image URL</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={heroSettings[`hero_image_${num}` as keyof typeof heroSettings]} 
                          onChange={e => setHeroSettings(prev => ({ ...prev, [`hero_image_${num}`]: e.target.value }))}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-accent" 
                          placeholder="https://images.unsplash.com/..." 
                        />
                        <div className="relative">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            id={`hero-upload-${num}`} 
                            onChange={(e) => handleHeroImageUpload(e, num)} 
                          />
                          <label htmlFor={`hero-upload-${num}`} className="cursor-pointer bg-accent/10 text-accent p-3 rounded-xl hover:bg-accent/20 transition-colors flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Title</label>
                      <input 
                        type="text" 
                        value={heroSettings[`hero_title_${num}` as keyof typeof heroSettings]} 
                        onChange={e => setHeroSettings(prev => ({ ...prev, [`hero_title_${num}`]: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-accent" 
                        placeholder="Slide Title" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Subtitle</label>
                    <input 
                      type="text" 
                      value={heroSettings[`hero_subtitle_${num}` as keyof typeof heroSettings]} 
                      onChange={e => setHeroSettings(prev => ({ ...prev, [`hero_subtitle_${num}`]: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-accent" 
                      placeholder="Slide Subtitle" 
                    />
                  </div>
                </div>
              ))}
              <button 
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Saving Settings...' : 'Save All Settings'}</span>
              </button>
            </form>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div onClick={() => !isSubmitting && setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-2xl font-bold text-primary">{editingProperty ? 'Edit Property' : 'Add Property'}</h2>
                <button disabled={isSubmitting} onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSaveProperty} className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                <input required name="title" defaultValue={editingProperty?.title} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Property Title" />
                <div className="grid grid-cols-2 gap-4">
                  <select name="type" defaultValue={editingProperty?.type} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"><option value="Flat">Flat</option><option value="Land">Land</option></select>
                  <input required name="price" type="number" defaultValue={editingProperty?.price} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Price (BDT)" />
                </div>
                <input required name="location" defaultValue={editingProperty?.location} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Location" />
                <input required name="area" type="number" defaultValue={editingProperty?.area} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Area (sqft)" />
                
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-slate-400">Property Images (Max 3)</label>
                  {[1, 2, 3].map(num => (
                    <div key={num} className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Image {num} URL</label>
                        <input name={`image${num}`} defaultValue={editingProperty?.images[num-1]} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm" placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Or Upload</label>
                        <div className="relative">
                          <input type="file" name={`file${num}`} accept="image/*" className="hidden" id={`file-upload-${num}`} onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const label = e.target.nextElementSibling;
                              if (label) label.textContent = file.name;
                            }
                          }} />
                          <label htmlFor={`file-upload-${num}`} className="cursor-pointer bg-white border border-slate-200 text-slate-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-slate-100 transition-colors whitespace-nowrap">
                            Choose File
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <input name="features" defaultValue={editingProperty?.features.join(', ')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Features (comma separated)" />
                <div className="space-y-1">
                  <input name="mapUrl" defaultValue={editingProperty?.mapUrl} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Google Maps Embed URL (https://www.google.com/maps/embed?...)" />
                  <p className="text-[10px] text-slate-400 px-2 italic">Note: Use the 'src' attribute from Google Maps 'Embed a map' option.</p>
                </div>
                <textarea required name="description" defaultValue={editingProperty?.description} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 resize-none" placeholder="Description"></textarea>
                <button disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : (editingProperty ? 'Update' : 'Publish')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <div onClick={() => !isSubmitting && setIsDeleteConfirmOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 className="text-red-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Are you sure?</h3>
              <p className="text-slate-500 mb-8">This action cannot be undone. All associated leads will also be deleted.</p>
              <div className="flex space-x-3">
                <button 
                  disabled={isSubmitting}
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
