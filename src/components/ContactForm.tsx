
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Прямая отправка формы через FormSubmit.co
      // Использование простой formData для максимальной надежности
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('contact', values.contact);
      formData.append('message', values.message);
      formData.append('_subject', 'Новая заявка с сайта InstaРешения');
      
      const response = await fetch('https://formsubmit.co/gadjarovkurban@gmail.com', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        toast({
          title: "Заявка отправлена",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        form.reset();
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      
      // Если API запрос не сработал, пробуем альтернативный подход через HTML форму
      const htmlForm = document.createElement('form');
      htmlForm.method = 'POST';
      htmlForm.action = 'https://formsubmit.co/gadjarovkurban@gmail.com';
      htmlForm.style.display = 'none';
      
      // Добавляем поля формы
      const nameInput = document.createElement('input');
      nameInput.name = 'name';
      nameInput.value = values.name;
      
      const contactInput = document.createElement('input');
      contactInput.name = 'contact';
      contactInput.value = values.contact;
      
      const messageInput = document.createElement('input');
      messageInput.name = 'message';
      messageInput.value = values.message;
      
      const subjectInput = document.createElement('input');
      subjectInput.name = '_subject';
      subjectInput.value = 'Новая заявка с сайта InstaРешения';
      
      const captchaInput = document.createElement('input');
      captchaInput.type = 'hidden';
      captchaInput.name = '_captcha';
      captchaInput.value = 'false';
      
      // Добавляем все поля в форму
      htmlForm.appendChild(nameInput);
      htmlForm.appendChild(contactInput);
      htmlForm.appendChild(messageInput);
      htmlForm.appendChild(subjectInput);
      htmlForm.appendChild(captchaInput);
      
      // Добавляем форму на страницу и отправляем
      document.body.appendChild(htmlForm);
      htmlForm.submit();
      
      // Сообщение для пользователя выводим только если не произошел редирект
      setTimeout(() => {
        toast({
          title: "Форма отправлена",
          description: "Спасибо за вашу заявку",
        });
        form.reset();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
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
          Заявка будет отправлена на почту gadjarovkurban@gmail.com
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
