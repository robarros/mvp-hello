# 🔧 Configuração do N8N Webhook

## Como Configurar a URL do Webhook do N8N

### 📋 Opção 1: Via Docker Compose (Recomendado)

Edite o arquivo `docker-compose.yml`:

```yaml
environment:
  - N8N_WEBHOOK_URL=http://n8n:5678/webhook/SEU_WEBHOOK_ID/chat
```

**Observações:**
- Dentro do Docker, use `http://n8n:5678` (nome do serviço)
- Para acesso externo use `http://localhost:9090`

### 📋 Opção 2: Via Arquivo .env (Desenvolvimento Local)

Crie/edite o arquivo `.env`:

```env
PORT=3000
NODE_ENV=development
N8N_WEBHOOK_URL=http://localhost:9090/webhook/SEU_WEBHOOK_ID/chat
```

### 📋 Opção 3: Via Variável de Ambiente

```bash
export N8N_WEBHOOK_URL="http://localhost:9090/webhook/SEU_WEBHOOK_ID/chat"
npm start
```

## 🎯 Como Obter o Webhook ID do N8N

1. Acesse o N8N: `http://localhost:9090`
2. Crie um novo workflow
3. Adicione um nó **"Webhook"**
4. Configure:
   - Method: `POST`
   - Path: `chat` (ou o que preferir)
5. Copie a URL gerada (ex: `http://localhost:5678/webhook/abc123/chat`)
6. Use o ID (`abc123`) na configuração

## 📍 Onde a Variável é Usada

A variável `N8N_WEBHOOK_URL` é automaticamente injetada em:

1. **N8N Chat Widget** (index.html) - Substituída dinamicamente pelo servidor
2. **Script JavaScript** (script.js) - Carregada via API `/api/config`

## 🔄 Como Funciona

```
┌─────────────────────────────────────────────────────────┐
│                    docker-compose.yml                    │
│                                                          │
│  environment:                                            │
│    - N8N_WEBHOOK_URL=http://n8n:5678/webhook/xxx/chat  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                      server.js                           │
│                                                          │
│  • Lê process.env.N8N_WEBHOOK_URL                       │
│  • Injeta no HTML (rota GET /)                          │
│  • Serve via API (rota GET /api/config)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌──────────────────┐         ┌──────────────────┐
│   index.html     │         │    script.js     │
│                  │         │                  │
│  webhookUrl:     │         │  N8N_WEBHOOK_URL │
│  'http://...'    │         │  = config.url    │
└──────────────────┘         └──────────────────┘
```

## 🧪 Testar Configuração

### 1. Verificar se a variável foi carregada

```bash
curl http://localhost:3000/api/config
```

**Resposta esperada:**
```json
{
  "n8nWebhookUrl": "http://n8n:5678/webhook/abc123/chat"
}
```

### 2. Verificar no navegador

1. Abra `http://localhost:3000`
2. Abra o Console do Navegador (F12)
3. Procure por: `N8N Webhook URL configurada: ...`

### 3. Testar o chat

1. Clique no ícone do chat
2. Envie uma mensagem
3. Verifique se chega no N8N

## 🔐 Segurança

### Para Produção

**Não exponha a URL do N8N diretamente!**

Opção 1: Use um proxy reverso (nginx)
```nginx
location /webhook/ {
    proxy_pass http://n8n:5678/webhook/;
}
```

Opção 2: Configure o backend para fazer proxy
```javascript
app.post('/api/chat', async (req, res) => {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});
```

E no frontend use:
```javascript
const N8N_WEBHOOK_URL = '/api/chat'; // Proxy local
```

## 📝 Exemplos de URLs

### Desenvolvimento Local
```
N8N_WEBHOOK_URL=http://localhost:9090/webhook/abc123/chat
```

### Docker Compose (interno)
```
N8N_WEBHOOK_URL=http://n8n:5678/webhook/abc123/chat
```

### Produção (com domínio)
```
N8N_WEBHOOK_URL=https://n8n.seudominio.com/webhook/abc123/chat
```

### Produção (com proxy reverso)
```
N8N_WEBHOOK_URL=https://api.seudominio.com/webhook/abc123/chat
```

## 🆘 Troubleshooting

### Erro: CORS
**Problema:** Chat não consegue se comunicar com N8N

**Solução:** Configure CORS no N8N ou use proxy no backend

### Erro: Connection refused
**Problema:** URL do N8N incorreta

**Solução:** 
- Desenvolvimento: use `http://localhost:9090`
- Docker: use `http://n8n:5678`

### Erro: 404 Not Found
**Problema:** Webhook ID incorreto

**Solução:** Verifique o ID do webhook no N8N

## 🔄 Atualizar URL do Webhook

### Sem reconstruir o Docker

1. Edite `docker-compose.yml`
2. Reinicie apenas o serviço web:
```bash
docker-compose restart web
```

### Em desenvolvimento

1. Edite `.env`
2. Reinicie o servidor:
```bash
npm start
```

---

**Configuração completa! 🎉**
