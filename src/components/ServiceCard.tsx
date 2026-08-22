
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
    <Card
      className={cn(
        "group border-border/70 shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 h-full",
        className
      )}
    >
      <CardHeader className="flex flex-col items-start gap-3 space-y-0">
        <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon name={icon} className="h-6 w-6" />
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
