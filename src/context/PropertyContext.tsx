import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type PropertyType = 'Flat' | 'Land';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  area: number; // sqft
  description: string;
  images: string[];
  features: string[];
  floorPlan?: string;
  mapUrl?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

interface PropertyContextType {
  properties: Property[];
  leads: Lead[];
  settings: Record<string, string>;
  loading: boolean;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => Promise<void>;
  updateSetting: (key: string, value: string) => Promise<void>;
  uploadImage: (file: File, bucket: string) => Promise<string>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_image: 'https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&w=1920&q=80',
    site_logo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
    fetchLeads();
    fetchSettings();

    // Set up real-time subscriptions
    const propertySubscription = supabase
      .channel('properties_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, () => {
        fetchProperties();
      })
      .subscribe();

    const leadSubscription = supabase
      .channel('leads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    const settingsSubscription = supabase
      .channel('settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
        fetchSettings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(propertySubscription);
      supabase.removeChannel(leadSubscription);
      supabase.removeChannel(settingsSubscription);
    };
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;
      if (data) {
        const settingsMap = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key, value });
      if (error) throw error;
    } catch (err) {
      console.error('Error updating setting:', err);
      alert('Failed to update setting.');
    }
  };

  const uploadImage = async (file: File, bucket: string): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const addProperty = async (newProp: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('properties')
        .insert([newProp]);
      if (error) throw error;
    } catch (err) {
      console.error('Error adding property:', err);
      alert('Failed to add property. Please check Supabase connection.');
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('Error updating property:', err);
      alert('Failed to update property.');
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      // First, delete associated leads to avoid foreign key constraints
      await supabase
        .from('leads')
        .delete()
        .eq('propertyId', id);

      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting property:', err);
      alert('Failed to delete property. Please try again.');
    }
  };

  const addLead = async (newLead: Omit<Lead, 'id' | 'date'>) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([newLead]);
      if (error) throw error;
    } catch (err) {
      console.error('Error adding lead:', err);
      alert('Failed to send inquiry.');
    }
  };

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      leads, 
      settings,
      loading,
      addProperty, 
      updateProperty, 
      deleteProperty, 
      addLead,
      updateSetting,
      uploadImage
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperties must be used within a PropertyProvider');
  return context;
}
