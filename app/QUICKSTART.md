# 🚀 Início Rápido - Hello MVP Node.js

## Opção 1: Execução Local (Desenvolvimento)

```bash
# 1. Entre na pasta app
cd app

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start

# OU use o script
./start.sh
```

Acesse: http://localhost:3000

---

## Opção 2: Docker Compose (Produção)

```bash
# 1. Entre na pasta app
cd app

# 2. Execute o Docker
./start-docker.sh

# OU manualmente
docker-compose up -d --build
```

Acesse: http://localhost:3000

---

## 📝 Comandos Úteis

### Desenvolvimento
- `npm install` - Instalar dependências
- `npm start` - Iniciar servidor
- `npm run dev` - Iniciar com auto-reload (nodemon)

### Docker
- `./start-docker.sh` - Iniciar com Docker
- `./stop-docker.sh` - Parar containers
- `docker-compose logs -f web` - Ver logs
- `docker-compose down` - Parar e remover

### Testes
- `curl http://localhost:3000` - Testar página
- `curl http://localhost:3000/health` - Testar health check

---

## 📂 Estrutura

```
app/
├── public/              # Frontend (HTML, CSS, JS)
├── server.js           # Backend Node.js
├── package.json        # Dependências
├── Dockerfile          # Build Docker
├── docker-compose.yml  # Orquestração
└── start.sh           # Script de inicialização
```

---

## 🔧 Configuração

Crie `.env` (ou copie de `.env.example`):
```env
PORT=3000
NODE_ENV=development
```

---

## 📖 Documentação Completa

Veja o arquivo [README.md](./README.md) para documentação completa.

---

## ❓ Problemas?

1. **Porta em uso**: Mude em `.env` ou use `PORT=3001 npm start`
2. **Erro no Docker**: Execute `docker-compose down -v` e tente novamente
3. **Módulos corrompidos**: Delete `node_modules` e execute `npm install`

---

**Desenvolvido com ❤️ para Hello Operadora**
