
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
    <Card className={cn("transition-all duration-300 hover:shadow-md hover:border-primary/30 h-full border-border/70 bg-card", className)}>
      <CardHeader className="flex flex-col items-start gap-3">
        <div className="rounded-md bg-accent p-2.5">
          <Icon name={icon} className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-lg font-semibold leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
