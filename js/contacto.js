/**
 * Lógica del formulario de contacto para Casa Segura
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form-element');
    const successMessage = document.getElementById('success-message');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Limpiar los estados de error previos
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

        const name = document.getElementById('name');
        if (name.value.trim().length < 3) {
            document.getElementById('name-error').style.display = 'block';
            name.classList.add('error');
            isValid = false;
        }

        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            document.getElementById('email-error').style.display = 'block';
            email.classList.add('error');
            isValid = false;
        }

        const subject = document.getElementById('subject');
        if (subject.value.trim().length === 0) {
            document.getElementById('subject-error').style.display = 'block';
            subject.classList.add('error');
            isValid = false;
        }

        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            document.getElementById('message-error').style.display = 'block';
            message.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});