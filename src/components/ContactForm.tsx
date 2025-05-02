
import React, { useState } from 'react';
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
import Icon from '@/components/ui/icon';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  contact: z.string().min(2, {
    message: 'Укажите ваш контакт для связи',
  }),
  message: z.string().min(5, {
    message: 'Пожалуйста, опишите ваш вопрос подробнее',
  }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Эмуляция отправки формы на email
    // В реальном проекте здесь будет запрос к бэкенду для отправки email
    setTimeout(() => {
      // Подготовка данных для отправки на почту
      const emailContent = `
        Новая заявка с сайта:
        Имя: ${values.name}
        Контакт: ${values.contact}
        Сообщение: ${values.message}
      `;
      
      // В реальном проекте здесь была бы отправка emailContent на vali_vali05@mail.ru
      console.log('Отправка заявки на vali_vali05@mail.ru:', emailContent);
      
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      // Данные для отладки в консоли
      console.log('Отправлено на email: vali_vali05@mail.ru');
      console.log('Данные формы:', values);
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
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
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контакт для связи</FormLabel>
              <FormControl>
                <Input placeholder="Телефон, email или Telegram" {...field} />
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
                  placeholder="Опишите вашу проблему с Instagram..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            'Отправить заявку'
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных. 
          Заявка будет отправлена на почту vali_vali05@mail.ru
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
