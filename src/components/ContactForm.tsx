
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  telegram: z.string().min(2, {
    message: 'Укажите ник в Telegram или номер телефона',
  }),
  message: z.string().optional(),
});

const ContactForm = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      telegram: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Форма отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram или телефон</FormLabel>
              <FormControl>
                <Input placeholder="@username или +7..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сообщение</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Опишите вашу проблему..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Отправить заявку</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
