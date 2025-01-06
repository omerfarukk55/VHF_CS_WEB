// script.js
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const capsLockWarning = document.getElementById('capslock-warning');
    const togglePassword = document.getElementById('toggle-password');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    // Caps Lock Uyarısı
    passwordInput.addEventListener('keyup', (event) => {
      if (event.getModifierState('CapsLock')) {
        capsLockWarning.style.display = 'block';
      } else {
        capsLockWarning.style.display = 'none';
      }
    });
  
    // Şifre Göster/Gizle Özelliği
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.style.backgroundImage = "url('./images/eye-slash-icon.png')"; // Göz kırpık ikon
      } else {
        passwordInput.type = 'password';
        togglePassword.style.backgroundImage = "url('./images/eye-icon.png')"; // Göz açık ikon
      }
    });
  
    // Form Doğrulama ve Hata Mesajı
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const password = passwordInput.value.trim();
  
      // Gerçek uygulamada burada sunucuya istek gönderilir
      // Örnek olarak basit bir kontrol yapalım
      if (username === 'admin' && password === '123456') {
        // Giriş başarılı
        window.location.href = 'dashboard.html'; // Yönlendirme yapabilirsiniz
      } else {
        // Hata mesajını göster
        errorMessage.style.display = 'block';
      }
    });
  });