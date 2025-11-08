# 🐳 Guia Docker - Hello Operadora

## Pré-requisitos

- Docker instalado ([Instalar Docker](https://docs.docker.com/get-docker/))
- Docker Compose instalado (geralmente já vem com Docker Desktop)

## 🚀 Como Executar

### Opção 1: Usando Docker diretamente

#### 1. Construir a imagem
```bash
docker build -t hello-operadora .
```

#### 2. Executar o container
```bash
docker run -d -p 8080:80 --name hello-web hello-operadora
```

#### 3. Acessar a aplicação
Abra o navegador e acesse: http://localhost:8080

### Opção 2: Usando Docker Compose (Recomendado)

#### 1. Executar com Docker Compose
```bash
docker-compose up -d
```

#### 2. Acessar a aplicação
Abra o navegador e acesse: http://localhost:8080

## 📋 Comandos Úteis

### Ver logs do container
```bash
docker logs hello-operadora
```

### Ver logs em tempo real
```bash
docker logs -f hello-operadora
```

### Parar o container
```bash
docker stop hello-operadora
```

### Iniciar o container novamente
```bash
docker start hello-operadora
```

### Remover o container
```bash
docker rm hello-operadora
```

### Parar e remover tudo (Docker Compose)
```bash
docker-compose down
```

### Reconstruir a imagem
```bash
docker-compose up -d --build
```

## 🔧 Personalizações

### Alterar a porta

**Docker direto:**
```bash
docker run -d -p 3000:80 --name hello-web hello-operadora
```
Acesse em: http://localhost:3000

**Docker Compose:**
Edite o arquivo `docker-compose.yml` e altere a linha:
```yaml
ports:
  - "3000:80"  # porta_host:porta_container
```

### Ver informações do container
```bash
docker inspect hello-operadora
```

### Entrar no container (para debug)
```bash
docker exec -it hello-operadora sh
```

## 📦 Estrutura do Container

- **Base:** Nginx Alpine (imagem leve ~23MB)
- **Porta interna:** 80
- **Porta exposta:** 8080 (padrão)
- **Diretório da aplicação:** `/usr/share/nginx/html/`

## 🌐 Deploy em Produção

### Docker Hub

1. **Login no Docker Hub:**
```bash
docker login
```

2. **Tag da imagem:**
```bash
docker tag hello-operadora seuusuario/hello-operadora:v1.0
```

3. **Push para Docker Hub:**
```bash
docker push seuusuario/hello-operadora:v1.0
```

4. **Usar em outro servidor:**
```bash
docker pull seuusuario/hello-operadora:v1.0
docker run -d -p 80:80 seuusuario/hello-operadora:v1.0
```

### Cloud Platforms

#### AWS ECS
```bash
# Instalar AWS CLI
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin SEU_ECR_URL
docker tag hello-operadora:latest SEU_ECR_URL/hello-operadora:latest
docker push SEU_ECR_URL/hello-operadora:latest
```

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/SEU_PROJECT_ID/hello-operadora
gcloud run deploy hello-operadora --image gcr.io/SEU_PROJECT_ID/hello-operadora --platform managed
```

#### Azure Container Instances
```bash
az acr build --registry SEU_REGISTRY --image hello-operadora:latest .
az container create --resource-group SEU_GRUPO --name hello-web --image SEU_REGISTRY.azurecr.io/hello-operadora:latest --dns-name-label hello-operadora --ports 80
```

## 🔒 Segurança

### Adicionar HTTPS (para produção)

Crie um arquivo `nginx.conf`:

```nginx
server {
    listen 80;
    server_name seudominio.com;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Atualize o Dockerfile:
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Verificar o que está usando a porta
sudo lsof -i :8080

# Ou usar outra porta
docker run -d -p 8081:80 --name hello-web hello-operadora
```

### Container não inicia
```bash
# Ver logs detalhados
docker logs hello-operadora

# Verificar status
docker ps -a
```

### Reconstruir do zero
```bash
docker-compose down
docker rmi hello-operadora
docker-compose up -d --build
```

## 📊 Monitoramento

### Ver uso de recursos
```bash
docker stats hello-operadora
```

### Limpar imagens não utilizadas
```bash
docker system prune -a
```

## ✅ Verificação

Após executar o container, verifique:

1. ✅ Container está rodando: `docker ps`
2. ✅ Aplicação responde: `curl http://localhost:8080`
3. ✅ Página carrega no navegador: http://localhost:8080
4. ✅ Chatbot funciona corretamente

## 🎯 Próximos Passos

- [ ] Configurar CI/CD (GitHub Actions, GitLab CI)
- [ ] Adicionar certificado SSL/TLS
- [ ] Configurar CDN
- [ ] Implementar health checks
- [ ] Adicionar monitoramento (Prometheus, Grafana)

---

Para mais informações sobre Docker, visite: https://docs.docker.com/
