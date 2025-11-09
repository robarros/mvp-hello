// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    // Click event
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard support (Enter or Space)
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore links that are just "#" (like social media placeholders)
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open and restore body scroll
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Chatbot Functionality
const chatButton = document.getElementById('chatButton');
const chatbot = document.getElementById('chatbot');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// N8N Webhook URL - Substituir com sua URL do N8N quando configurar
const N8N_WEBHOOK_URL = 'https://seu-n8n-instance.com/webhook/chat';

// Toggle chatbot - only if elements exist
if (chatButton && chatbot) {
    chatButton.addEventListener('click', () => {
        chatbot.classList.add('active');
        chatButton.style.display = 'none';
    });
}

if (closeChat && chatbot && chatButton) {
    closeChat.addEventListener('click', () => {
        chatbot.classList.remove('active');
        chatButton.style.display = 'flex';
    });
}

// Send message function
async function sendChatMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Prevent sending if already processing
    if (sendMessage.disabled) return;

    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    // Disable input while processing
    chatInput.disabled = true;
    sendMessage.disabled = true;

    try {
        // Send message to N8N webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                timestamp: new Date().toISOString(),
                sessionId: getSessionId()
            })
        });

        // Remove typing indicator
        typingIndicator.remove();

        if (response.ok) {
            const data = await response.json();
            // Add bot response
            addMessage(data.response || 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.', 'bot');
        } else {
            // Fallback response if N8N is not configured yet
            addMessage(getBotResponse(message), 'bot');
        }
    } catch (error) {
        // Remove typing indicator
        typingIndicator.remove();
        
        // Fallback to local responses if N8N is not available
        console.log('N8N not configured, using local responses');
        addMessage(getBotResponse(message), 'bot');
    } finally {
        // Re-enable input
        chatInput.disabled = false;
        sendMessage.disabled = false;
        chatInput.focus();
    }

    scrollToBottom();
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    return messageDiv;
}

// Add typing indicator
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <i class="fas fa-ellipsis-h"></i> Digitando...
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
}

// Get or create session ID
function getSessionId() {
    let sessionId = sessionStorage.getItem('chatSessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
}

// Local bot responses (fallback when N8N is not configured)
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Planos
    if (lowerMessage.includes('plano') || lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
        return 'Temos 3 planos de telefonia móvel disponíveis:\n\n🔹 Básico - R$ 79/mês (10GB + Ligações Ilimitadas)\n🔹 Premium - R$ 129/mês (30GB + Apps Grátis)\n🔹 Ultra - R$ 199/mês (60GB + 5G + Roaming Internacional)\n\nQual plano você gostaria de saber mais?';
    }
    
    // Contato
    if (lowerMessage.includes('contato') || lowerMessage.includes('telefone') || lowerMessage.includes('ligar')) {
        return 'Você pode entrar em contato conosco através do telefone 0800 123 4567 ou email contato@hello.com.br. Estamos disponíveis 24h por dia!';
    }
    
    // Cobertura
    if (lowerMessage.includes('cobertura') || lowerMessage.includes('disponível') || lowerMessage.includes('região')) {
        return 'Para verificar a cobertura na sua região, preciso do seu CEP. Pode me informar?';
    }
    
    // Ativação
    if (lowerMessage.includes('instalação') || lowerMessage.includes('instalar') || lowerMessage.includes('ativar') || lowerMessage.includes('ativação') || lowerMessage.includes('chip')) {
        return 'A ativação do chip é super rápida! Você pode retirar em uma de nossas lojas ou receber em casa. A ativação é feita em poucos minutos após inserir o chip no aparelho.';
    }
    
    // Horário
    if (lowerMessage.includes('horário') || lowerMessage.includes('quando') || lowerMessage.includes('atendimento')) {
        return 'Nosso atendimento funciona 24 horas por dia, 7 dias por semana. Estamos sempre disponíveis para ajudá-lo!';
    }
    
    // Sobre a empresa
    if (lowerMessage.includes('sobre') || lowerMessage.includes('empresa') || lowerMessage.includes('história') || lowerMessage.includes('origem') || lowerMessage.includes('china')) {
        return 'A Hello é uma operadora de telefonia móvel chinesa que investiu no Brasil. Unimos a tecnologia avançada da China com o mercado brasileiro, oferecendo cobertura 5G e planos inovadores. Acreditamos na parceria sino-brasileira para um futuro conectado!';
    }
    
    // Saudações
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        return 'Olá! Bem-vindo à Hello. Como posso ajudá-lo hoje? Posso tirar dúvidas sobre nossos planos de telefonia móvel, coberturas, ativação de chip ou qualquer outro assunto.';
    }
    
    // Agradecimento
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu')) {
        return 'Por nada! Estou aqui para ajudar. Se tiver mais alguma dúvida, é só perguntar! 😊';
    }
    
    // Default response
    return 'Entendi sua pergunta. Para melhor atendê-lo, gostaria de transferir para um de nossos atendentes humanos? Ou posso responder perguntas sobre nossos planos de telefonia móvel, coberturas e serviços.';
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message on button click - only if elements exist
if (sendMessage) {
    sendMessage.addEventListener('click', sendChatMessage);
}

// Send message on Enter key - only if element exists
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form fields
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const phone = contactForm.querySelector('input[type="tel"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        
        // Validate
        if (!name || !email || !phone || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Validate phone (basic Brazilian phone validation)
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
            alert('Por favor, insira um telefone válido.');
            return;
        }
        
        const data = { name, email, phone, message };
        
        // Here you can send the form data to N8N or your backend
        console.log('Form data:', data);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Enviado!';
        submitBtn.style.background = 'var(--success-color)';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    });
}

// Plan cards - Add click handlers
document.querySelectorAll('.plan-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevent multiple clicks
        if (button.classList.contains('loading')) return;
        
        const planName = e.target.closest('.plan-card').querySelector('h3').textContent;
        
        // Open chatbot with pre-filled message
        chatbot.classList.add('active');
        chatButton.style.display = 'none';
        
        setTimeout(() => {
            chatInput.value = `Gostaria de contratar o plano ${planName}`;
            chatInput.focus();
        }, 500);
    });
});

// Hero button - See Plans
const verPlanosBtn = document.getElementById('verPlanosBtn');
if (verPlanosBtn) {
    verPlanosBtn.addEventListener('click', () => {
        const plansSection = document.getElementById('plans');
        if (plansSection) {
            plansSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// About button - See Plans
const conhecaPlanosBtn = document.getElementById('conhecaPlanosBtn');
if (conhecaPlanosBtn) {
    conhecaPlanosBtn.addEventListener('click', () => {
        const plansSection = document.getElementById('plans');
        if (plansSection) {
            plansSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Hero button - Talk to attendant
const talkButton = document.querySelector('.hero-buttons .btn-secondary');
if (talkButton) {
    talkButton.addEventListener('click', () => {
        chatbot.classList.add('active');
        chatButton.style.display = 'none';
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            // Remove observer after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.plan-card, .service-card, .mission-card, .value-item, .contact-item').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Smooth reveal for section titles
document.querySelectorAll('section h2').forEach(title => {
    title.style.opacity = '0';
    observer.observe(title);
});
