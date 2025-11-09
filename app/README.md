# Hello MVP - Node.js Application

Aplicação Node.js + Express para o site da operadora Hello.

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Docker e Docker Compose (opcional)

## 🚀 Instalação e Execução

### Opção 1: Execução Local (Recomendado para Desenvolvimento)

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente (se não existir)
cp .env.example .env

# Iniciar servidor em modo desenvolvimento (com hot-reload)
npm run dev

# OU iniciar em modo produção
npm start
```

**Usando o script de inicialização:**
```bash
./start.sh
```

A aplicação estará disponível em `http://localhost:3000`

### Opção 2: Docker Compose (Recomendado para Produção)

```bash
# Construir e iniciar com Docker Compose
docker-compose up -d --build

# OU usar o script
./start-docker.sh
```

**Comandos úteis do Docker:**
```bash
# Ver logs
docker-compose logs -f web

# Parar containers
docker-compose down
# OU
./stop-docker.sh

# Reconstruir
docker-compose up -d --build
```

### Opção 3: Docker Manual

```bash
# Build da imagem
docker build -t hello-node-app .

# Executar container
docker run -d -p 3000:3000 --name hello-web hello-node-app

# Ver logs
docker logs -f hello-web

# Parar e remover
docker stop hello-web && docker rm hello-web
```

## 📁 Estrutura do Projeto

```
app/
├── public/              # Arquivos estáticos (HTML, CSS, JS, imagens)
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos
│   ├── script.js       # JavaScript do frontend
│   ├── hello.jpeg      # Logo
│   └── n8n-chat-custom.css
├── server.js           # Servidor Express
├── package.json        # Dependências e scripts
├── Dockerfile          # Configuração Docker
├── docker-compose.yml  # Orquestração Docker
├── .env.example        # Exemplo de variáveis de ambiente
├── .dockerignore       # Arquivos ignorados pelo Docker
├── .gitignore          # Arquivos ignorados pelo Git
├── start.sh           # Script de inicialização local
├── start-docker.sh    # Script para Docker
├── stop-docker.sh     # Script para parar Docker
└── README.md          # Esta documentação
```

## � Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `app`:

```env
PORT=3000
NODE_ENV=development
```

**Variáveis disponíveis:**
- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)

## �🛠️ Tecnologias Utilizadas

- **Node.js 18+**: Runtime JavaScript
- **Express 4.18+**: Framework web minimalista
- **Helmet**: Segurança HTTP headers
- **Compression**: Compressão gzip
- **CORS**: Cross-Origin Resource Sharing

## 📝 API Endpoints

### Rotas Principais

- `GET /`: Página principal do site
- `GET /health`: Health check do servidor
- `POST /api/contact`: Enviar mensagem de contato

### Health Check

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

### Enviar Contato

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "message": "Gostaria de mais informações"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Mensagem recebida com sucesso!"
}
```

## 🐳 Docker

### Dockerfile

O Dockerfile usa multi-stage build para otimizar o tamanho da imagem:

- **Stage 1 (builder)**: Instala dependências
- **Stage 2 (production)**: Copia apenas o necessário
- Usa `alpine` para imagem leve
- Executa como usuário não-root (segurança)
- Inclui health check
- Usa `dumb-init` para gerenciamento de processos

### Docker Compose

O `docker-compose.yml` configura:
- Porta mapeada: 3000:3000
- Health check automático
- Restart automático
- Volumes para hot-reload em desenvolvimento
- Rede isolada

## 🔒 Segurança

- Headers de segurança com Helmet
- Usuário não-root no Docker
- Validação de inputs
- Rate limiting (pode ser adicionado)
- CORS configurável

## 📊 Monitoramento

### Logs

```bash
# Logs em tempo real (local)
npm start

# Logs Docker
docker-compose logs -f web

# Logs do container
docker logs -f hello-node-web
```

### Health Check

O servidor inclui health check automático:
- Endpoint: `/health`
- Intervalo: 30s
- Timeout: 3s
- Retries: 3

## 🚀 Deploy

### Preparação para Produção

1. **Definir variáveis de ambiente:**
```bash
export NODE_ENV=production
export PORT=3000
```

2. **Build e iniciar:**
```bash
npm install --production
npm start
```

3. **Com Docker:**
```bash
docker-compose up -d --build
```

### Recomendações para Deploy

- Use um processo manager como PM2
- Configure nginx como reverse proxy
- Use HTTPS (Let's Encrypt)
- Configure logs externos (winston, morgan)
- Use variáveis de ambiente para configurações sensíveis
- Implemente rate limiting
- Configure backup automático

## 🧪 Testes

```bash
# Testar health check
curl http://localhost:3000/health

# Testar página principal
curl http://localhost:3000

# Testar API de contato
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","phone":"11987654321","message":"Teste"}'
```

## 🐛 Troubleshooting

### Porta já em uso

```bash
# Encontrar processo na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar outra porta
PORT=3001 npm start
```

### Docker não inicia

```bash
# Verificar logs
docker-compose logs web

# Reconstruir sem cache
docker-compose build --no-cache

# Limpar volumes
docker-compose down -v
```

### Node modules corrompidos

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance

- Compressão gzip habilitada
- Cache de arquivos estáticos (1 dia)
- ETags habilitados
- Imagem Docker otimizada (~50MB)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato: contato@hello.com.br

---

**Desenvolvido com ❤️ para Hello Operadora**
