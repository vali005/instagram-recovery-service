
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Icon name="Instagram" className="text-primary h-7 w-7" />
        <span className="text-xl font-semibold">InstaРешения</span>
      </div>
      
      <Button onClick={scrollToContact} className="hidden md:flex items-center gap-2">
        Связаться
        <Icon name="SendHorizonal" className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default Header;
