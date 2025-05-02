
interface EmailData {
  name: string;
  contact: string;
  message: string;
}

/**
 * В реальном проекте здесь будет функция для отправки данных на сервер,
 * который отправит email. Для этого нужен бэкенд, например на Node.js с Nodemailer.
 * 
 * В текущей реализации форма только эмулирует отправку.
 * Для интеграции с настоящим email сервисом нужно:
 * 1. Создать бэкенд API (Node.js/Express)
 * 2. Использовать почтовый сервис (Nodemailer, SendGrid, и т.д.)
 * 3. Защитить форму от спама (CAPTCHA)
 */
export const sendEmailNotification = async (data: EmailData): Promise<boolean> => {
  try {
    // В реальном проекте здесь был бы запрос к API:
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     ...data,
    //     to: 'vali_vali05@mail.ru',
    //     subject: 'Новая заявка с сайта InstaРешения'
    //   }),
    // });
    // return response.ok;

    // Эмуляция отправки
    console.log('Отправка email на vali_vali05@mail.ru:', data);
    return true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return false;
  }
};
