// Modo claro/oscuro
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    function updateThemeButton(theme) {
        themeSwitcher.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Formulario de presupuesto
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const dimensions = document.getElementById('dimensions').value;
            const urgency = document.getElementById('urgency').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (!name || !email || !phone || !service || !message) {
                alert('Por favor complete todos los campos obligatorios (*).');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingrese un email válido.');
                return;
            }
            
            // Simulación de envío
            const serviceText = {
                'fabricacion': 'Fabricación de Campana',
                'limpieza': 'Limpieza de Filtros',
                'mantenimiento': 'Mantenimiento',
                'reparacion': 'Reparación',
                'consulta': 'Consulta General'
            }[service] || service;
            
            const urgencyText = {
                'normal': 'Normal (1-2 semanas)',
                'urgente': 'Urgente (3-5 días)',
                'muy-urgente': 'Muy Urgente (24-48 horas)'
            }[urgency] || urgency;
            
            alert(`¡Gracias ${name}!\n\nHemos recibido tu solicitud de presupuesto:\n\n• Servicio: ${serviceText}\n• Urgencia: ${urgencyText}\n• Contacto: ${phone} / ${email}\n\nTe contactaremos dentro de las próximas 24 horas.`);
            
            // Resetear formulario
            this.reset();
        });
    }

    // Botón CTA del hero
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#budget').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Botones CTA secundarios
    document.querySelectorAll('.cta-button.secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0,0,0,0.95)';
        } else {
            navbar.style.background = 'rgba(0,0,0,0.9)';
        }
    });

    // Detección MEJORADA del logotipo
    function checkLogoLoad() {
        const logos = document.querySelectorAll('img[src*="Logo"]');
        console.log('🔍 Verificando carga de logotipos...');
        
        logos.forEach((logo, index) => {
            const testImage = new Image();
            
            testImage.onload = function() {
                console.log(`✅ Logotipo ${index + 1} cargado correctamente:`, logo.src);
                logo.style.opacity = '1';
                logo.classList.add('loaded');
            };
            
            testImage.onerror = function() {
                console.error(`❌ Error cargando logotipo ${index + 1}:`, logo.src);
                logo.style.display = 'none';
                
                // Crear fallback de texto
                const fallback = document.createElement('span');
                fallback.className = 'logo-fallback';
                fallback.textContent = 'Escobar e Hijos';
                fallback.style.cssText = 'color: inherit; font-family: Montserrat, sans-serif; font-weight: bold; font-size: 1.2rem;';
                
                logo.parentNode.appendChild(fallback);
            };
            
            testImage.src = logo.src;
        });
    }

    // Verificar logotipos después de que la página cargue
    setTimeout(checkLogoLoad, 500);

    // Manejo de imágenes de galería que no cargan
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.onerror = function() {
            console.log('⚠️ Error cargando imagen de galería:', this.src);
            const container = this.parentElement;
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '<p>Imagen no disponible</p>';
            placeholder.style.cssText = 'width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;';
            container.innerHTML = '';
            container.appendChild(placeholder);
        };
        
        img.onload = function() {
            console.log('✅ Imagen de galería cargada:', this.src);
        };
    });

    // Efectos hover mejorados para tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Validación en tiempo real del formulario
    const formInputs = document.querySelectorAll('#budgetForm input, #budgetForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#27ae60';
            }
        });
    });

    // Carga progresiva de imágenes
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const tempImage = new Image();
            tempImage.src = img.src;
        });
    }

    // Inicializar cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        console.log('🚀 Sitio web de Escobar e Hijos cargado correctamente');
        preloadImages();
        
        // Mostrar mensaje de bienvenida en consola
        console.log('%c¡Bienvenido a Escobar e Hijos!', 'color: #2c5aa0; font-size: 16px; font-weight: bold;');
        console.log('%cEspecialistas en campanas gastronómicas', 'color: #666; font-size: 14px;');
    });

    // Manejo de errores global
    window.addEventListener('error', function(e) {
        console.error('Error global:', e.error);
    });
});

// API Handler (para futuras integraciones)
class ApiHandler {
    constructor() {
        this.baseURL = 'https://api.exchangerate-api.com/v4/latest/';
    }

    async getExchangeRate(fromCurrency, toCurrency) {
        try {
            const response = await fetch(`${this.baseURL}${fromCurrency}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            
            if (data.rates && data.rates[toCurrency]) {
                return data.rates[toCurrency];
            } else {
                throw new Error('Tipo de cambio no disponible');
            }
        } catch (error) {
            console.error('Error al obtener cotización:', error);
            return null;
        }
    }

    async convertPrice(price, fromCurrency, toCurrency) {
        const rate = await this.getExchangeRate(fromCurrency, toCurrency);
        if (rate) {
            return (price * rate).toFixed(2);
        }
        return null;
    }
}

// Exportar para uso global (si es necesario)
window.ApiHandler = ApiHandler;