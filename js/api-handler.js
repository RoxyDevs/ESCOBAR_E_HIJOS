// API Handler para cotización de monedas
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

    // Método para convertir precios
    async convertPrice(price, fromCurrency, toCurrency) {
        const rate = await this.getExchangeRate(fromCurrency, toCurrency);
        if (rate) {
            return (price * rate).toFixed(2);
        }
        return null;
    }
}

// Uso de la API
document.addEventListener('DOMContentLoaded', function() {
    const apiHandler = new ApiHandler();
    
    // Ejemplo: Convertir 1000 ARS a USD (solo en consola por ahora)
    apiHandler.convertPrice(1000, 'ARS', 'USD')
        .then(convertedPrice => {
            if (convertedPrice) {
                console.log(`1000 ARS = ${convertedPrice} USD`);
                // Aquí puedes actualizar el DOM con el precio convertido
            }
        });
});

// Función para inicializar mapa (requiere clave de Google Maps)
function initMap() {
    // Coordenadas de ejemplo (Rosario, Argentina)
    const location = { lat: -32.94682, lng: -60.63932 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Escobar e Hijos'
    });
}