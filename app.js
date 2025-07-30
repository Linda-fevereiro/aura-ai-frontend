// Definindo a URL base do seu backend Node.js
// ***** ATUALIZE ESTA URL COM A URL DO SEU DEPLOY NO VERCEL *****
const API_BASE_URL = 'https://aura-ai-backend.vercel.app/'; // Exemplo: https://aura-ai-backend-xyz.vercel.app/api

// Função para exibir mensagens personalizadas (substitui alert())
function showMessageModal(title, message, type = 'info') {
    const modal = document.getElementById('messageModal');
    const modalTitle = document.getElementById('messageModalTitle');
    const modalBody = document.getElementById('messageModalBody');
    const modalOverlay = document.getElementById('messageModalOverlay');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    modal.classList.remove('info', 'error', 'success');
    modalOverlay.classList.add('active');
    modal.classList.add(type);

    const closeBtn = document.getElementById('messageModalCloseBtn');

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        closeBtn.removeEventListener('click', closeModal);
        modalOverlay.removeEventListener('click', closeModal);
    };

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
}


// Sistema de Memória Avançado com os 10 princípios (agora interage com o backend)
class AuraMemory {
    constructor() {
        this.currentUser = null;
        this.currentChatId = null;
        this.learningBuffer = [];
        this.contextMemory = {};
        this.ethicalGuidelines = this.createEthicalGuidelines();
    }

    // Métodos de Autenticação (interagindo com o backend)
    async registerUser(name, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao registrar usuário.');
            }
            return data;
        } catch (error) {
            console.error('Erro no registro:', error);
            showMessageModal('Erro de Registro', error.message, 'error');
            return null;
        }
    }

    async loginUser(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login.');
            }
            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            showMessageModal('Erro de Login', error.message, 'error');
            return null;
        }
    }

    // Métodos de Chat (interagindo com o backend)
    async createChat(userId, title) {
        try {
            const response = await fetch(`${API_BASE_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({ userId, title })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar chat.');
            }
            return data.chatId;
        } catch (error) {
            console.error('Erro ao criar chat:', error);
            showMessageModal('Erro ao Criar Chat', error.message, 'error');
            return null;
        }
    }

    async getUserChats(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/chats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao obter chats do usuário.');
            }
            return data;
        } catch (error) {
            console.error('Erro ao obter chats do usuário:', error);
            showMessageModal('Erro ao Carregar Chats', error.message, 'error');
            return [];
        }
    }

    async getChatMessages(chatId) {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao obter mensagens do chat.');
            }
            return data;
        } catch (error) {
            console.error('Erro ao obter mensagens do chat:', error);
            showMessageModal('Erro ao Carregar Mensagens', error.message, 'error');
            return [];
        }
    }

    async addMessage(chatId, sender, content) {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({ sender, content })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao adicionar mensagem.');
            }
            return true;
        } catch (error) {
            console.error('Erro ao adicionar mensagem:', error);
            showMessageModal('Erro ao Enviar Mensagem', error.message, 'error');
            return false;
        }
    }

    // Métodos dos 10 Princípios (alguns ainda simulados no frontend, outros interagem com o backend)

    // 1. Aprendizado Contínuo (simulado no frontend, mas dados podem ser enviados ao backend)
    continuousLearning(newData) {
        this.learningBuffer.push(newData);
        if (this.learningBuffer.length > 10) {
            this.processLearningBuffer();
        }
    }

    processLearningBuffer() {
        console.log("Processando buffer de aprendizado (simulado):", this.learningBuffer);
        this.learningBuffer = [];
    }

    // 2. Capacidade de Generalização (ainda simulada no frontend)
    generalizeKnowledge(sourceDomain, targetDomain) {
        console.log(`Generalizando conhecimento de ${sourceDomain} para ${targetDomain} (simulado).`);
    }

    // 3. Explicabilidade (ainda simulada no frontend)
    explainDecision(decision) {
        const explanations = {
            "football": "Baseei minha resposta em dados históricos e estatísticas de jogos.",
            "celebrities": "Esta informação vem de biografias verificadas e fontes confiáveis.",
            "academics": "Este conceito é baseado em material acadêmico e livros didáticos.",
            "curiosities": "Esta curiosidade foi selecionada de nossa vasta coleção de fatos interessantes.",
            "default": "Analisei vários fatores para chegar a esta conclusão."
        };
        return explanations[decision] || explanations.default;
    }

    // 4. Adaptabilidade Contextual (simulada no frontend)
    setContext(userId, context) {
        this.contextMemory[userId] = context;
    }

    getContext(userId) {
        return this.contextMemory[userId] || {};
    }

    // 5. Multimodalidade (simulada no frontend)
    processMultimodalInput(input) {
        return {
            text: input.text || "",
            sentiment: this.analyzeSentiment(input.text),
            urgency: this.detectUrgency(input.text)
        };
    }

    analyzeSentiment(text) {
        if (text.match(/!\s*$/)) return "urgent";
        if (text.match(/\?/)) return "question";
        return "neutral";
    }

    detectUrgency(text) {
        const urgentWords = ['urgente', 'importante', 'rápido', 'ajuda'];
        return urgentWords.some(word => text.toLowerCase().includes(word));
    }

    // 6. Segurança e Robustez (validação básica no frontend, mais robusta no backend)
    validateInput(input) {
        const forbidden = ["<script>", "alert(", "eval(", "function("];
        return !forbidden.some(pattern => input.includes(pattern));
    }

    // 7. Autonomia e Planejamento (simulada no frontend)
    createPlan(goal) {
        const steps = {
            "football": ["Coletar estatísticas", "Analisar histórico", "Comparar jogadores"],
            "celebrities": ["Verificar biografia", "Checar notícias recentes", "Confirmar fontes"],
            "academics": ["Entender conceito", "Buscar material de apoio", "Formular explicação"],
            "curiosities": ["Pesquisar fatos aleatórios", "Filtrar por interesse", "Apresentar curiosidade"],
            "default": ["Entender pergunta", "Buscar informações", "Formular resposta"]
        };
        return steps[goal] || steps.default;
    }

    // 8. Raciocínio lógico e simbólico (ainda simulado no frontend)
    logicalReasoning(premises) {
        if (premises.every(p => p.condition)) {
            return premises[premises.length - 1].conclusion;
        }
        return null;
    }

    // 9. Alinhamento com valores humanos (ainda simulada no frontend)
    ethicalCheck(response) {
        const ethicalIssues = this.ethicalGuidelines.issues;
        for (const issue of ethicalIssues) {
            if (response.includes(issue)) {
                return false;
            }
        }
        return true;
    }

    createEthicalGuidelines() {
        return {
            issues: ["ódio", "violência", "discriminação", "fake news", "sexo", "pornografia", "racismo"],
            principles: [
                "Respeito à dignidade humana",
                "Promoção da verdade",
                "Proteção da privacidade",
                "Neutralidade e imparcialidade"
            ]
        };
    }

    // 10. Baixo consumo de dados (ainda simulada no frontend)
    optimizeResponse(response) {
        if (response.length > 500) {
            return response.substring(0, 497) + "...";
        }
        return response;
    }

    // Consulta a base de conhecimento (agora via backend)
    async queryKnowledge(message) {
        try {
            const response = await fetch(`${API_BASE_URL}/knowledge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({ query: message })
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Erro desconhecido ao consultar conhecimento.';
                throw new Error(errorMessage);
            }
            return data.response;
        } catch (error) {
            console.error('Erro ao consultar conhecimento:', error);
            showMessageModal('Erro da Aura AI', error.message, 'error');
            return "Desculpe, não consegui encontrar informações sobre isso no momento.";
        }
    }
}

// Controlador da Aplicação
class AuraAIController {
    constructor() {
        this.memory = new AuraMemory();
        this.initElements();
        this.bindEvents();
        this.checkUserSession();
    }

    initElements() {
        this.elements = {
            authModal: document.getElementById('authModal'),
            appContent: document.getElementById('appContent'),
            loginForm: document.getElementById('loginForm'),
            registerForm: document.getElementById('registerForm'),
            loginBtn: document.getElementById('loginBtn'),
            registerBtn: document.getElementById('registerBtn'),
            googleLoginBtn: document.getElementById('googleLoginBtn'),
            googleRegisterBtn: document.getElementById('googleRegisterBtn'),
            showRegister: document.getElementById('showRegister'),
            showLogin: document.getElementById('showLogin'),
            chatMessages: document.getElementById('chatMessages'),
            messageInput: document.getElementById('messageInput'),
            sendButton: document.getElementById('sendButton'),
            chatHistory: document.getElementById('chatHistory'),
            newChatBtn: document.getElementById('newChatBtn'),
            currentChatTitle: document.getElementById('currentChatTitle'),
            userAvatar: document.getElementById('userAvatar'),
            userName: document.getElementById('userName'),
            userEmail: document.getElementById('userEmail'),
            menuToggle: document.getElementById('menuToggle'),
            sidebar: document.getElementById('sidebar'),
            languageSelector: document.getElementById('languageSelector'),
            languageDropdown: document.getElementById('languageDropdown'),
            messageModal: document.getElementById('messageModal'),
            messageModalCloseBtn: document.getElementById('messageModalCloseBtn'),
            messageModalOverlay: document.getElementById('messageModalOverlay'),
        };
    }

    bindEvents() {
        this.elements.showRegister.addEventListener('click', () => this.toggleAuthForms());
        this.elements.showLogin.addEventListener('click', () => this.toggleAuthForms());
        this.elements.loginBtn.addEventListener('click', () => this.handleLogin());
        this.elements.registerBtn.addEventListener('click', () => this.handleRegister());
        this.elements.googleLoginBtn.addEventListener('click', () => showMessageModal('Autenticação Google', 'A autenticação Google ainda não está totalmente integrada com o backend. Por favor, use email/senha.', 'info'));
        this.elements.googleRegisterBtn.addEventListener('click', () => showMessageModal('Autenticação Google', 'A autenticação Google ainda não está totalmente integrada com o backend. Por favor, use email/senha.', 'info'));

        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.elements.newChatBtn.addEventListener('click', () => this.createNewChat());
        this.elements.menuToggle.addEventListener('click', () => this.toggleSidebar());
        this.elements.languageSelector.addEventListener('click', () => this.toggleLanguageDropdown());

        window.addEventListener('resize', () => this.handleResize());
    }

    async checkUserSession() {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('userToken');

        if (storedUser && storedToken) {
            try {
                const user = JSON.parse(storedUser);
                this.memory.currentUser = user;
                this.loginUserUIUpdate(user);
            } catch (e) {
                console.error("Erro ao parsear dados do usuário do localStorage:", e);
                localStorage.clear();
                this.elements.authModal.classList.add('active');
                this.elements.appContent.style.display = 'none';
            }
        } else {
            this.elements.authModal.classList.add('active');
            this.elements.appContent.style.display = 'none';
        }
    }

    toggleAuthForms() {
        this.elements.loginForm.style.display =
            this.elements.loginForm.style.display === 'none' ? 'block' : 'none';
        this.elements.registerForm.style.display =
            this.elements.registerForm.style.display === 'none' ? 'block' : 'none';
    }

    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const result = await this.memory.loginUser(email, password);
        if (result) {
            this.memory.currentUser = result.user;
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            localStorage.setItem('userToken', result.token);
            this.loginUserUIUpdate(result.user);
        }
    }

    async handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;

        if (password 
