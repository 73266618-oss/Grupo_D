/**
 * Validación avanzada de formularios para Casa Segura
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    // Reglas de validación mediante Expresiones Regulares (Regex)
    const patterns = {
        name: /^[a-zA-ZÀ-ÿ\s]{6,40}$/, // Permite nombres y apellidos con espacios
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^\d{9}$/, // Restringe exactamente a 9 dígitos numéricos
        address: /^.{10,100}$/ // Requiere un mínimo de 10 caracteres
    };

    // Mensajes de error personalizados para retroalimentación visual
    const messages = {
        name: "Ingresa tu nombre y apellido completo (mínimo 6 caracteres).",
        email: "Ingresa un correo electrónico válido.",
        phone: "El teléfono debe tener exactamente 9 dígitos numéricos.",
        address: "La dirección debe ser detallada (mínimo 10 caracteres).",
        property: "Selecciona un tipo de propiedad."
    };

    const inputs = form.querySelectorAll('input, select, textarea');

    // Implementación de validación en tiempo real (feedback inmediato)
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            validateInput(e.target);
        });

        input.addEventListener('blur', (e) => {
            validateInput(e.target);
        });
    });

    /**
     * Valida un elemento de entrada individual contra sus reglas definidas
     * @param {HTMLElement} input - El elemento del formulario a validar
     */
    function validateInput(input) {
        const name = input.name;
        const value = input.value.trim();
        let isValid = true;

        if (patterns[name]) {
            isValid = patterns[name].test(value);
        } else if (input.required) {
            isValid = value !== "";
        }

        const errorSpan = document.getElementById(`${name}-error`);
        
        if (!isValid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            if (errorSpan) {
                errorSpan.textContent = messages[name] || "Campo inválido";
                errorSpan.style.display = 'block';
            }
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
            if (errorSpan) {
                errorSpan.style.display = 'none';
            }
        }

        return isValid;
    }

    // Validación exhaustiva final al momento de procesar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            alert('¡Pedido Procesado! Un técnico de Casa Segura te contactará en las próximas 24 horas para coordinar la instalación.');
            localStorage.removeItem('casaSeguraCart'); // Vaciar el carrito tras finalizar la compra exitosamente
            window.location.href = '../index.html';
        } else {
            // Mejorar UX enfocando automáticamente el primer campo que presente un error
            const firstError = form.querySelector('.invalid');
            if (firstError) firstError.focus();
        }
    });
});