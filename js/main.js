// =======================
// MAIN.JS - ESCROBAR E HIJOS
// =======================

// 1. Toggle de tema (oscuro / claro)
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Guardar tema en localStorage
    if (localStorage.getItem("theme")) {
        body.setAttribute("data-theme", localStorage.getItem("theme"));
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            if (currentTheme === "dark") {
                body.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            } else {
                body.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }
});

// 2. Animaciones de aparición (fade-in)
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

window.addEventListener("scroll", checkFadeIn);
window.addEventListener("load", checkFadeIn);

// 3. Smooth Scroll en navegación
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        if (link.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        }
    });
});

// 4. Ejemplo de uso de ApiHandler (conversión de precios)
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof ApiHandler !== "undefined") {
        const apiHandler = new ApiHandler();

        // Ejemplo: convertir 1000 ARS a USD
        const converted = await apiHandler.convertPrice(1000, "ARS", "USD");
        if (converted) {
            console.log(`💱 1000 ARS = ${converted} USD`);
            // Si querés mostrar en la web:
            const priceBox = document.getElementById("price-converted");
            if (priceBox) {
                priceBox.innerText = `1000 ARS ≈ ${converted} USD`;
            }
        }
    }
});

// 5. Google Maps init (si hay div con id="map")
function initMap() {
    const location = { lat: -32.94682, lng: -60.63932 }; // Rosario

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#000000" }]
            }
        ]
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: "Escobar e Hijos"
    });
}

// Exponer initMap al scope global para Google Maps
window.initMap = initMap;
