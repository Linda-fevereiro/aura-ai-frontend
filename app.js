// Definindo a URL base do seu backend Node.js
// ***** ESTA URL FOI ATUALIZADA PARA O SEU DEPLOY NO VERCEL *****
const API_BASE_URL = 'https://aura-ai-backend.vercel.app/'; // URL do backend no Vercel

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
                // Se a resposta não for OK, tenta extrair a mensagem de erro do backend
                const errorMessage = data.message || 'Erro desconhecido ao consultar conhecimento.';
                throw new Error(errorMessage);
            }
            return data.response;
        } catch (error) {
            console.error('Erro ao consultar conhecimento:', error);
            // Exibe a mensagem de erro do backend ou uma genérica
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
        this.checkUserSession(); // Verifica se há um usuário logado ao carregar a página
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
            messageModal: document.getElementById('messageModal'), // Adicionado
            messageModalCloseBtn: document.getElementById('messageModalCloseBtn'), // Adicionado
            messageModalOverlay: document.getElementById('messageModalOverlay'), // Adicionado
        };
    }

    bindEvents() {
        // Eventos de autenticação
        this.elements.showRegister.addEventListener('click', () => this.toggleAuthForms());
        this.elements.showLogin.addEventListener('click', () => this.toggleAuthForms());
        this.elements.loginBtn.addEventListener('click', () => this.handleLogin());
        this.elements.registerBtn.addEventListener('click', () => this.handleRegister());
        // Google Auth: Por enquanto, apenas exibe uma mensagem.
        // A integração real com o Google Sign-In SDK seria mais complexa e envolveria o Firebase Auth no frontend.
        this.elements.googleLoginBtn.addEventListener('click', () => showMessageModal('Autenticação Google', 'A autenticação Google ainda não está totalmente integrada com o backend. Por favor, use email/senha.', 'info'));
        this.elements.googleRegisterBtn.addEventListener('click', () => showMessageModal('Autenticação Google', 'A autenticação Google ainda não está totalmente integrada com o backend. Por favor, use email/senha.', 'info'));


        // Eventos do chat
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { // Permite Shift+Enter para nova linha
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.elements.newChatBtn.addEventListener('click', () => this.createNewChat());
        this.elements.menuToggle.addEventListener('click', () => this.toggleSidebar());
        this.elements.languageSelector.addEventListener('click', () => this.toggleLanguageDropdown());

        // Eventos de redimensionamento
        window.addEventListener('resize', () => this.handleResize());
    }

    // Verifica se há um usuário logado no localStorage
    async checkUserSession() {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('userToken');

        if (storedUser && storedToken) {
            try {
                const user = JSON.parse(storedUser);
                // Opcional: validar o token com o backend para garantir que ainda é válido
                // Para este exemplo, vamos confiar no token armazenado e no uid.
                this.memory.currentUser = user;
                this.loginUserUIUpdate(user); // Atualiza a UI e carrega os chats
            } catch (e) {
                console.error("Erro ao parsear dados do usuário do localStorage:", e);
                localStorage.clear(); // Limpa dados inválidos
                this.elements.authModal.classList.add('active'); // Mostra o modal de autenticação
                this.elements.appContent.style.display = 'none'; // Esconde o conteúdo do app
            }
        } else {
            this.elements.authModal.classList.add('active'); // Mostra o modal de autenticação
            this.elements.appContent.style.display = 'none'; // Esconde o conteúdo do app
        }
    }

    // Métodos de Autenticação
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
            localStorage.setItem('userToken', result.token); // Armazena o token JWT
            this.loginUserUIUpdate(result.user);
        }
    }

    async handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;

        if (password !== confirm) {
            showMessageModal('Erro de Senha', 'As senhas não coincidem!', 'error');
            return;
        }

        const result = await this.memory.registerUser(name, email, password);
        if (result) {
            this.memory.currentUser = result.user;
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            localStorage.setItem('userToken', result.token); // Armazena o token JWT
            this.loginUserUIUpdate(result.user);
        }
    }

    // Atualiza a UI após o login bem-sucedido
    loginUserUIUpdate(user) {
        this.elements.authModal.classList.remove('active');
        this.elements.appContent.style.display = 'flex';

        // Atualizar UI do usuário na sidebar
        this.elements.userName.textContent = user.displayName || user.email;
        this.elements.userEmail.textContent = user.email;
        this.elements.userAvatar.textContent =
            (user.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : user.email.substring(0, 2)).toUpperCase().substring(0, 2);

        // Carregar chats existentes ou criar um novo
        this.loadLastChatOrCreateNew();
    }

    // Carrega o último chat do usuário ou cria um novo
    async loadLastChatOrCreateNew() {
        const chats = await this.memory.getUserChats(this.memory.currentUser.uid);
        if (chats && chats.length > 0) {
            // Carrega o chat mais recente (assumindo que o backend ordena por updatedAt)
            this.loadChat(chats[0].id);
        } else {
            this.createNewChat(); // Cria um novo chat se não houver nenhum
        }
    }

    // Métodos do Chat
    async createNewChat(title = "Novo Chat") {
        if (!this.memory.currentUser) {
            showMessageModal('Erro', 'Nenhum usuário logado.', 'error');
            return;
        }

        const chatId = await this.memory.createChat(
            this.memory.currentUser.uid,
            title
        );

        if (chatId) {
            this.memory.currentChatId = chatId;
            this.elements.currentChatTitle.textContent = title;
            this.clearChatMessages();
            this.showWelcomeMessage();
            this.loadUserChats(); // Recarrega a lista de chats na sidebar para mostrar o novo chat
        }
    }

    // Carrega a lista de chats do usuário na sidebar
    async loadUserChats() {
        if (!this.memory.currentUser) return;

        this.elements.chatHistory.innerHTML = ''; // Limpa o histórico atual
        const chats = await this.memory.getUserChats(this.memory.currentUser.uid);

        if (chats) {
            chats.forEach(chat => {
                const chatItem = document.createElement('div');
                chatItem.className = `chat-item ${chat.id === this.memory.currentChatId ? 'active' : ''}`;
                chatItem.textContent = chat.title;
                chatItem.setAttribute('data-chat-id', chat.id); // Adiciona um atributo para fácil seleção
                chatItem.addEventListener('click', () => this.loadChat(chat.id));
                this.elements.chatHistory.appendChild(chatItem);
            });
        }
    }

    // Carrega as mensagens de um chat específico
    async loadChat(chatId) {
        // Remove a classe 'active' de todos os itens de chat
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });

        const messages = await this.memory.getChatMessages(chatId);
        if (messages) {
            this.memory.currentChatId = chatId;
            // Adiciona a classe 'active' ao item de chat clicado
            const clickedChatItem = document.querySelector(`.chat-item[data-chat-id="${chatId}"]`);
            if (clickedChatItem) {
                clickedChatItem.classList.add('active');
            }

            // Atualiza o título do chat na barra superior
            const chats = await this.memory.getUserChats(this.memory.currentUser.uid);
            const currentChat = chats.find(chat => chat.id === chatId);
            this.elements.currentChatTitle.textContent = currentChat ? currentChat.title : "Chat Carregado";

            this.clearChatMessages(); // Limpa as mensagens atuais

            if (messages.length === 0) {
                this.showWelcomeMessage(); // Mostra a mensagem de boas-vindas se o chat estiver vazio
            } else {
                messages.forEach(msg => this.displayMessage(msg.sender, msg.content)); // Exibe as mensagens carregadas
            }
        }
    }

    // Envia uma mensagem do usuário
    async sendMessage() {
        const input = this.elements.messageInput;
        const message = input.value.trim();

        if (!message || !this.memory.currentChatId || !this.memory.currentUser) return;

        // Validar entrada (segurança básica no frontend)
        if (!this.memory.validateInput(message)) {
            showMessageModal('Entrada Inválida', 'Sua mensagem contém conteúdo inválido!', 'error');
            return;
        }

        // Adicionar mensagem do usuário na UI e no backend
        this.displayMessage('user', message);
        await this.memory.addMessage(this.memory.currentChatId, 'user', message);

        // Limpar input
        input.value = '';

        // Mostrar indicador de digitação da Aura AI
        this.showTypingIndicator();

        // Processar e responder (com delay para simular processamento da IA)
        setTimeout(async () => {
            this.removeTypingIndicator(); // Remove o indicador de digitação
            const response = await this.generateResponse(message); // Gera a resposta da IA
            this.displayMessage('aura', response); // Exibe a resposta na UI
            await this.memory.addMessage(this.memory.currentChatId, 'aura', response); // Salva a resposta no backend

            // Aprendizado contínuo (ainda simulado no frontend)
            this.memory.continuousLearning({
                category: 'user_interactions',
                key: this.memory.currentUser.uid + '_' + Date.now(),
                value: { question: message, response }
            });
        }, 1000 + Math.random() * 2000); // Delay aleatório para simular processamento
    }

    // Gera a resposta da Aura AI, aplicando os 10 princípios
    async generateResponse(message) {
        // 4. Adaptabilidade contextual (simulada)
        const context = this.memory.getContext(this.memory.currentUser.uid);
        const processedInput = this.memory.processMultimodalInput({
            text: message,
            ...context
        });

        // 7. Autonomia e Planejamento (simulada)
        const plan = this.memory.createPlan(this.detectDomain(message));
        console.log("Plano gerado:", plan); // Para depuração

        // Gerar resposta baseada em conhecimento (agora via backend)
        let response = await this.memory.queryKnowledge(message);

        // 3. Explicabilidade (simulada)
        const explanation = this.memory.explainDecision(this.detectDomain(message));

        // 9. Verificação ética (simulada)
        if (!this.memory.ethicalCheck(response)) {
            response = "Desculpe, não posso responder a isso devido a diretrizes éticas.";
        }

        // 10. Otimização de resposta (simulada)
        response = this.memory.optimizeResponse(response);

        return `${response}\n\n*Explicação:* ${explanation}`;
    }

    // Detecta o domínio da mensagem para direcionar a resposta
    detectDomain(message) {
        if (message.match(/futebol|jogador|time|campo|gol|messi|cristiano ronaldo|real madrid|barcelona/i)) return "football";
        if (message.match(/ator|atriz|celebridade|filme|música|will smith|tom hanks|taylor swift/i)) return "celebrities";
        if (message.match(/curiosidade|sabia que|fato interessante/i)) return "curiosities";
        if (message.match(/matemática|ciência|história|escola|prova|cálculo|álgebra|segunda guerra mundial|independência do brasil/i)) return "academics";
        return "default";
    }

    // Exibe uma mensagem na interface do chat
    displayMessage(sender, content) {
        const messagesContainer = this.elements.chatMessages;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'user' ?
                this.elements.userAvatar.textContent : 'AI'}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${sender === 'user' ?
                        (this.memory.currentUser ? this.memory.currentUser.displayName || this.memory.currentUser.email : 'Você') : 'Aura AI'}</span>
                    <span class="message-time">${timeString}</span>
                </div>
                <div class="message-text">${content}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rola para o final
    }

    // Mostra o indicador de "digitando" da Aura AI
    showTypingIndicator() {
        const messagesContainer = this.elements.chatMessages;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message aura';
        typingDiv.id = 'typingIndicator';

        typingDiv.innerHTML = `
            <div class="message-avatar">AI</div>
            <div class="message-content">
                <div class="thinking-indicator">
                    <span>Aura está digitando...</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove o indicador de "digitando"
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Limpa todas as mensagens do chat
    clearChatMessages() {
        this.elements.chatMessages.innerHTML = '';
    }

    // Exibe a mensagem de boas-vindas inicial
    showWelcomeMessage() {
        const messagesContainer = this.elements.chatMessages;
        const welcomeMessageHTML = `
            <div class="welcome-message">
                <div class="welcome-title">Olá! Eu sou a Aura AI</div>
                <div class="welcome-text">
                    Seu assistente pessoal inteligente com conhecimentos em diversos assuntos, incluindo futebol, celebridades, curiosidades e matérias escolares.
                    <br><br>
                    Comece digitando sua mensagem ou selecione uma conversa anterior.
                </div>

                <div class="capabilities-grid">
                    <div class="capability">
                        <div class="capability-icon"><i class="fas fa-futbol"></i></div>
                        <div class="capability-title">Futebol</div>
                        <div class="capability-desc">Estatísticas, jogadores, times e histórias do mundo do futebol</div>
                    </div>

                    <div class="capability">
                        <div class="capability-icon"><i class="fas fa-star"></i></div>
                        <div class="capability-title">Famosos</div>
                        <div class="capability-desc">Informações sobre celebridades, filmes, música e cultura pop</div>
                    </div>

                    <div class="capability">
                        <div class="capability-icon"><i class="fas fa-lightbulb"></i></div>
                        <div class="capability-title">Curiosidades</div>
                        <div class="capability-desc">Fatos interessantes e conhecimentos aleatórios sobre diversos temas</div>
                    </div>

                    <div class="capability">
                        <div class="capability-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="capability-title">Matérias Escolares</div>
                        <div class="capability-desc">Ajuda com matemática, ciências, história e outras disciplinas</div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.innerHTML = welcomeMessageHTML;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Métodos de UI
    toggleSidebar() {
        this.elements.sidebar.classList.toggle('active');
    }

    toggleLanguageDropdown() {
        this.elements.languageDropdown.classList.toggle('show');

        if (this.elements.languageDropdown.classList.contains('show')) {
            const clickHandler = (e) => {
                if (!this.elements.languageSelector.contains(e.target) &&
                    !this.elements.languageDropdown.contains(e.target)) {
                    this.elements.languageDropdown.classList.remove('show');
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.elements.sidebar.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.auraAI = new AuraAIController();

    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            document.getElementById('languageSelector').querySelector('span').textContent =
                option.querySelector('span').textContent;
            document.getElementById('languageDropdown').classList.remove('show');
            console.log(`Idioma selecionado: ${lang}`);
        });
    });
});
