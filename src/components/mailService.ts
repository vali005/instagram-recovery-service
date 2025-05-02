
interface EmailData {
  name: string;
  contact: string;
  message: string;
}

/**
 * Функция для отправки данных через сервис FormSubmit.co
 * FormSubmit.co - это бесплатный сервис отправки форм без необходимости настройки бэкенда.
 * Сервис автоматически перенаправляет данные формы на указанный email.
 */
export const sendEmailNotification = async (data: EmailData): Promise<boolean> => {
  try {
    // Отправка данных через FormSubmit.co
    const response = await fetch("https://formsubmit.co/ajax/vali_vali05@mail.ru", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        contact: data.contact,
        message: data.message,
        _subject: "Новая заявка с сайта InstaРешения",
        _template: "table"
      })
    });
    
    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return false;
  }
};
