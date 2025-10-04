// Chatbot functionality
let isChatOpen = false;

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const toggleBtn = document.querySelector('.chatbot-toggle');
    
    if (isChatOpen) {
        chatbot.style.display = 'none';
        toggleBtn.textContent = '+';
    } else {
        chatbot.style.display = 'block';
        toggleBtn.textContent = '−';
    }
    isChatOpen = !isChatOpen;
}

function openChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'block';
    isChatOpen = true;
    document.querySelector('.chatbot-toggle').textContent = '−';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    addMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('precio') || message.includes('costo') || message.includes('presupuesto')) {
        return "Para un presupuesto preciso, necesitamos conocer los detalles de tu campana. ¿Podrías contarnos más?";
    }
    else if (message.includes('limpieza') || message.includes('filtro')) {
        return "Ofrecemos limpieza profesional de filtros. ¿Es para un restaurante o negocio gastronómico?";
    }
    else if (message.includes('fabricación') || message.includes('nueva')) {
        return "Fabricamos campanas a medida. ¿Qué dimensiones necesitas?";
    }
    else if (message.includes('tiempo') || message.includes('dura')) {
        return "La limpieza toma 2-4 horas. Fabricación: 1-2 semanas según complejidad.";
    }
    else if (message.includes('contacto') || message.includes('teléfono')) {
        return "📞 +54 341 555-1234 📧 ramone4062@gmail.com";
    }
    else if (message.includes('hola') || message.includes('buenas')) {
        return "¡Hola! Bienvenido a Escobar e Hijos. ¿En qué puedo ayudarte?";
    }
    else {
        return "Entiendo tu consulta. Te recomiendo contactarnos al +54 341 555-1234 para una atención personalizada.";
    }
}

document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});