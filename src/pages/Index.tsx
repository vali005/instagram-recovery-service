
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServiceSection from '@/components/ServiceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Toaster position="top-right" />
      <Header />
      <main>
        <HeroSection />
        <ServiceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
