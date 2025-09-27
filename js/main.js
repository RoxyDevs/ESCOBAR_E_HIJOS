// =======================
// MAIN.JS - ESCOBAR E HIJOS (VERSIÓN CORREGIDA)
// =======================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Escobar e Hijos - Página cargada correctamente");

    // 1. Toggle de tema (oscuro / claro) - CORREGIDO
    const themeBtn = document.getElementById("themeBtn"); // Cambiado de theme-toggle a themeBtn
    const body = document.body;

    // Guardar tema en localStorage
    if (localStorage.getItem("theme")) {
        body.setAttribute("data-theme", localStorage.getItem("theme"));
        updateThemeIcon();
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            if (currentTheme === "dark") {
                body.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            } else {
                body.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (!themeBtn) return;
        const currentTheme = body.getAttribute("data-theme");
        const icon = themeBtn.querySelector("i");
        if (currentTheme === "dark") {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    }

    // 2. Animaciones de aparición (fade-in) - MEJORADO
    const fadeInElements = document.querySelectorAll(".fade-in");

    function checkFadeIn() {
        const triggerBottom = window.innerHeight * 0.85;
        fadeInElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("visible");
            }
        });
    }

    // Añadir estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener("scroll", checkFadeIn);
    window.addEventListener("load", checkFadeIn);
    checkFadeIn(); // Ejecutar inmediatamente

    // 3. Smooth Scroll en navegación - CORREGIDO
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            if (link.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 4. Manejo del formulario de presupuesto - AÑADIDO
    const budgetForm = document.querySelector(".budget-form");
    if (budgetForm) {
        budgetForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            
            alert(`¡Gracias ${name}! Hemos recibido tu solicitud de presupuesto. Te contactaremos dentro de 24 horas.`);
            this.reset();
        });
    }

    // 5. Google Maps - SEGURO (sin errores)
    function initSafeMap() {
        const mapElement = document.getElementById("map");
        if (!mapElement) return;

        // Mostrar mensaje amigable si no hay API key
        mapElement.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Ubicación: Rosario, Santa Fe</h3>
                <p>Pje Espinillo 4062, depto 2</p>
                <p>Para ver el mapa interactivo, contacta con nosotros</p>
                <a href="https://maps.google.com/?q=Pje+Espinillo+4062+Rosario+Santa+Fe" 
                   target="_blank" 
                   style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; text-decoration: none; border-radius: 5px;">
                    Abrir en Google Maps
                </a>
            </div>
        `;
    }

    // 6. Inicialización del Chatbot - AÑADIDO
    function initChatbot() {
        console.log("🤖 Chatbot inicializado");
        // El chatbot ya tiene su propia lógica en chatbot.js
        // Aquí podemos añadir configuraciones adicionales si es necesario
    }

    // 7. Botones flotantes - AÑADIDO
    function initFloatingButtons() {
        // Añadir efectos a los botones flotantes
        const floatingButtons = document.querySelectorAll('.whatsapp-float, .facebook-float');
        floatingButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Inicializar todas las funcionalidades
    initSafeMap();
    initChatbot();
    initFloatingButtons();

    // 8. ApiHandler - MEJORADO (manejo de errores)
    if (typeof ApiHandler !== "undefined") {
        const apiHandler = new ApiHandler();

        // Ejemplo: convertir 1000 ARS a USD (solo si hay elemento para mostrar)
        const priceBox = document.getElementById("price-converted");
        if (priceBox) {
            apiHandler.convertPrice(1000, "ARS", "USD")
                .then(converted => {
                    if (converted) {
                        priceBox.innerText = `1000 ARS ≈ ${converted} USD`;
                    }
                })
                .catch(error => {
                    console.log("💰 Conversión de moneda no disponible");
                });
        }
    }
});

// 9. Google Maps fallback - SEGURO
function initMap() {
    console.log("🗺️ Google Maps no disponible - Modo seguro activado");
    // No hacer nada para evitar errores
}

// Exponer initMap al scope global (pero seguro)
window.initMap = initMap;

// 10. Funciones globales para el chatbot
window.openChat = function() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.style.display = 'block';
        document.querySelector('.chatbot-toggle').textContent = '−';
        // Enfocar el input del chat
        const chatInput = document.getElementById('chatInput');
        if (chatInput) chatInput.focus();
    }
};

// 11. Detectar clicks fuera del chatbot para cerrarlo
document.addEventListener('click', function(e) {
    const chatbot = document.getElementById('chatbot');
    const chatbotHeader = document.querySelector('.chatbot-header');
    
    if (chatbot && chatbot.style.display === 'block' && 
        !chatbot.contains(e.target) && 
        e.target !== chatbotHeader) {
        chatbot.style.display = 'none';
        document.querySelector('.chatbot-toggle').textContent = '+';
    }
});

console.log("✅ main.js cargado - Escobar e Hijos listo");