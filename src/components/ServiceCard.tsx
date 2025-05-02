
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon,
  className
}) => {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg h-full", className)}>
      <CardHeader className="flex items-center gap-2">
        <div className="rounded-full bg-primary/10 p-3 mb-2">
          <Icon name={icon} className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
