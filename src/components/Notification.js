'use client';
import { createRoot } from 'react-dom/client';

export function showNotification(message, type = 'success') {
  // 기존 알림 제거
  const existingNotification = document.getElementById('notification-container');
  if (existingNotification) {
    existingNotification.remove();
  }

  // 새 알림 컨테이너 생성
  const container = document.createElement('div');
  container.id = 'notification-container';
  document.body.appendChild(container);

  // 알림 스타일 설정
  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  const Notification = () => (
    <div
      className={`fixed bottom-4 right-4 ${backgroundColor} text-white px-6 py-3 rounded-lg shadow-lg`}
      role="alert"
    >
      {message}
    </div>
  );

  // 알림 렌더링
  const root = createRoot(container);
  root.render(<Notification />);

  // 3초 후 알림 제거
  setTimeout(() => {
    container.remove();
  }, 3000);
} 