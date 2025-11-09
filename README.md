# Hello - MVP Operadora de Telefonia Móvel

## 📱 Sobre o Projeto

Este é um MVP (Minimum Viable Product) de uma página web para operadora de telefonia móvel, desenvolvida com duas versões:
- **Versão HTML Estática** (pasta `html/`) - Nginx + N8N
- **Versão Node.js** (pasta `app/`) - Express + N8N (Recomendada)

A página inclui um chatbot integrado com N8N para atendimento automatizado.

---

## 📂 Estrutura do Projeto

```
mvp-hello/
├── app/                      # 🚀 Versão Node.js (RECOMENDADA)
│   ├── public/              # Frontend (HTML, CSS, JS, imagens)
│   │   ├── index.html       # Página principal
│   │   ├── styles.css       # Estilos
│   │   ├── script.js        # JavaScript
│   │   ├── hello.jpeg       # Logo
│   │   └── n8n-chat-custom.css
│   ├── server.js            # Servidor Express
│   ├── package.json         # Dependências Node.js
│   ├── Dockerfile           # Build Docker para Node.js
│   ├── docker-compose.yml   # Docker Compose (Node + N8N)
│   ├── README.md            # Documentação detalhada
│   ├── QUICKSTART.md        # Guia de início rápido
│   ├── N8N_CONFIG.md        # Configuração do N8N
│   ├── setup-n8n.sh         # Script de configuração do N8N
│   ├── .env.example         # Exemplo de variáveis de ambiente
│   ├── .dockerignore        # Arquivos ignorados pelo Docker
│   └── .gitignore           # Arquivos ignorados pelo Git
│
├── html/                     # 📄 Versão HTML Estática (nginx)
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos
│   ├── script.js            # JavaScript
│   ├── n8n-chat-custom.css  # Estilos do chat
│   ├── Dockerfile           # Build Docker para Nginx
│   └── docker-compose.yml   # Docker Compose (Nginx + N8N)
│
├── faq/                      # 📚 Base de conhecimento
│   └── faq-pinecone.json    # FAQs para integração Pinecone
│
├── n8n/                      # 🤖 Workflows N8N
│   └── mvp.json             # Workflow exemplo
│
├── hello.jpeg               # Logo da empresa
├── .dockerignore            # Arquivos ignorados pelo Docker
└── README.md                # Esta documentação

```

---

## 🚀 Início Rápido

### Opção 1: Node.js + Docker (RECOMENDADO) ⭐

```bash
# Entre na pasta app
cd app

# Inicie com Docker Compose
docker-compose up -d --build

# OU use o script
./start-docker.sh
```

**Acesse:**
- 🌐 Site: http://localhost:3000
- 🏥 Health Check: http://localhost:3000/health
- 🤖 N8N: http://localhost:9090

### Opção 2: Node.js Local (Desenvolvimento)

```bash
# Entre na pasta app
cd app

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm start

# OU use o script
./start.sh
```

**Acesse:** http://localhost:3000

### Opção 3: HTML Estático + Nginx

```bash
# Entre na pasta html
cd html

# Inicie com Docker Compose
docker-compose up -d --build
```

**Acesse:**
- 🌐 Site: http://localhost:8080
- 🤖 N8N: http://localhost:9090

---

## ✨ Funcionalidades

### 🎨 Design e Interface
- ✅ Design Responsivo (Desktop, Tablet, Mobile)
- ✅ Animações suaves e modernas
- ✅ Navegação intuitiva com menu hamburger
- ✅ Seção Hero com call-to-action
- ✅ Cards de planos interativos
- ✅ FAQ expandível com categorias
- ✅ Formulário de contato com validação

### 📋 Seções da Página
- **Hero**: Chamada principal
- **Sobre**: História e valores da empresa
- **Planos**: 3 planos de telefonia (Básico, Premium, Ultra)
- **Serviços**: Pós-pago, Pré-pago, 5G, Roaming
- **FAQ**: Perguntas frequentes categorizadas
- **Contato**: Formulário e informações de contato

### 🤖 Chatbot N8N
- ✅ Interface moderna e intuitiva
- ✅ Integração completa com N8N
- ✅ Respostas automáticas (fallback)
- ✅ Sessão única por usuário
- ✅ Respostas contextuais
- ✅ Widget flutuante
- ✅ Configuração via variável de ambiente

---

## 🔧 Configuração do N8N

### 1. Obter URL do Webhook

1. Acesse o N8N: `http://localhost:9090`
2. Crie um novo workflow
3. Adicione um nó **"Webhook"**
4. Configure como **POST** com path `chat`
5. Copie a URL do webhook

### 2. Configurar no Projeto

#### **Versão Node.js (app/)**

Edite `app/docker-compose.yml`:
```yaml
environment:
  - N8N_WEBHOOK_URL=http://n8n:5678/webhook/SEU_ID/chat
```

OU crie `app/.env`:
```env
N8N_WEBHOOK_URL=http://localhost:9090/webhook/SEU_ID/chat
```

#### **Versão HTML (html/)**

Edite `html/script.js` linha 82:
```javascript
const N8N_WEBHOOK_URL = 'http://localhost:9090/webhook/SEU_ID/chat';
```

E `html/index.html` linha 854:
```javascript
webhookUrl: 'http://localhost:9090/webhook/SEU_ID/chat',
```

📖 **Documentação completa:** `app/N8N_CONFIG.md`

---

## 🛠️ Tecnologias Utilizadas

### Versão Node.js (app/)
- **Node.js 18+**: Runtime JavaScript
- **Express 4.18+**: Framework web
- **Helmet**: Segurança HTTP
- **Compression**: Compressão gzip
- **CORS**: Cross-Origin Resource Sharing
- **Docker**: Containerização
- **N8N**: Automação e chatbot

### Versão HTML (html/)
- **HTML5**: Estrutura
- **CSS3**: Estilos (Flexbox, Grid, Animations)
- **JavaScript ES6+**: Interatividade
- **Nginx**: Servidor web
- **Docker**: Containerização
- **N8N**: Automação e chatbot

### Comum
- **Font Awesome 6.4.0**: Ícones
- **N8N Chat Widget**: Widget de chat

---

## 📝 API Endpoints (Versão Node.js)

### Rotas Web
- `GET /` - Página principal
- `GET /health` - Health check do servidor
- `GET /api/config` - Configurações (webhook N8N)
- `POST /api/contact` - Enviar mensagem de contato

### Exemplos

#### Health Check
```bash
curl http://localhost:3000/health
```

**Resposta:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-09T12:00:00.000Z",
  "uptime": 3600
}
```

#### Obter Configurações
```bash
curl http://localhost:3000/api/config
```

**Resposta:**
```json
{
  "n8nWebhookUrl": "http://n8n:5678/webhook/abc123/chat"
}
```

---

## 🐳 Docker

### Versão Node.js

```bash
cd app

# Build
docker-compose build

# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Parar
docker-compose down
```

### Versão HTML

```bash
cd html

# Build e iniciar
docker-compose up -d --build

# Parar
docker-compose down
```

---

## 📦 Scripts Úteis (Versão Node.js)

### Desenvolvimento
```bash
npm install          # Instalar dependências
npm start            # Iniciar servidor
npm run dev          # Iniciar com auto-reload (nodemon)
```

### Docker
```bash
./start-docker.sh    # Iniciar com Docker
./stop-docker.sh     # Parar containers
./setup-n8n.sh       # Configurar webhook N8N
```

---

## 🎨 Personalização

### Alterar Cores

Edite `styles.css`:
```css
:root {
    --primary-color: #dc2626;
    --secondary-color: #ef4444;
    --accent-color: #f87171;
}
```

### Alterar Logo

Substitua `hello.jpeg` pela logo da sua empresa.

### Alterar Textos

Edite `index.html` para personalizar:
- Nome da empresa
- Descrições
- Preços dos planos
- Informações de contato

---

## 🧪 Testes

### Testar Página Principal
```bash
# Node.js
curl http://localhost:3000

# HTML
curl http://localhost:8080
```

### Testar Health Check (Node.js)
```bash
curl http://localhost:3000/health
```

### Testar N8N
```bash
curl -X POST http://localhost:9090/webhook/SEU_ID/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá"}'
```

---

## 🆘 Troubleshooting

### Porta já em uso
```bash
# Verificar processo
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar outra porta
PORT=3001 npm start
```

### Docker não inicia
```bash
# Ver logs
docker-compose logs web

# Reconstruir
docker-compose down
docker-compose up -d --build

# Limpar volumes
docker-compose down -v
```

### N8N não conecta
1. Verifique se o N8N está rodando: `http://localhost:9090`
2. Verifique a URL do webhook
3. Verifique os logs: `docker-compose logs n8n`

---

## 📚 Documentação Adicional

- **`app/README.md`** - Documentação detalhada da versão Node.js
- **`app/QUICKSTART.md`** - Guia de início rápido
- **`app/N8N_CONFIG.md`** - Configuração completa do N8N
- **`faq/faq-pinecone.json`** - Base de conhecimento para IA

---

## � Segurança

### Recomendações para Produção

1. **Use HTTPS** (Let's Encrypt)
2. **Configure firewall**
3. **Use variáveis de ambiente** para dados sensíveis
4. **Não exponha portas desnecessárias**
5. **Configure rate limiting**
6. **Use proxy reverso** (nginx)
7. **Mantenha dependências atualizadas**
8. **Faça backups regulares**

---

## 📈 Performance

### Versão Node.js
- ✅ Compressão gzip habilitada
- ✅ Cache de arquivos estáticos
- ✅ ETags habilitados
- ✅ Imagem Docker otimizada (~50MB)
- ✅ Multi-stage build

### Versão HTML
- ✅ Nginx otimizado
- ✅ Imagem Alpine (leve)
- ✅ Cache de recursos

---

## � Deploy em Produção

### Preparação

1. Configure variáveis de ambiente
2. Use domínio próprio
3. Configure SSL/TLS
4. Configure backup automático
5. Configure monitoramento

### Opções de Deploy

- **VPS** (DigitalOcean, Linode, AWS EC2)
- **Container Service** (AWS ECS, Google Cloud Run)
- **PaaS** (Heroku, Render, Railway)
- **Kubernetes** (produção em larga escala)

---

## 📄 Licença

ISC

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## � Suporte

Para dúvidas ou problemas:
- 📧 Email: contato@hello.com.br
- 📱 Telefone: 1052 ou *8486
- 🤖 Chat: Use o widget no site

---

## 📊 Status do Projeto

- ✅ MVP Completo
- ✅ Versão Node.js funcional
- ✅ Versão HTML funcional
- ✅ Integração N8N
- ✅ Docker configurado
- ✅ Documentação completa

---

**Desenvolvido com ❤️ para Hello Operadora**

*Última atualização: 09/11/2025*
