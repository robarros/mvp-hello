#!/bin/bash

# Script para configurar o Webhook do N8N

echo "🔧 Configurador de Webhook N8N"
echo "================================"
echo ""

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo "📄 Criando arquivo .env..."
    cp .env.example .env
fi

echo "Por favor, forneça as seguintes informações:"
echo ""

# Pedir URL do webhook
read -p "🔗 URL do Webhook do N8N (ex: http://localhost:9090/webhook/abc123/chat): " webhook_url

if [ -z "$webhook_url" ]; then
    echo "❌ URL não pode estar vazia!"
    exit 1
fi

# Atualizar .env
echo "📝 Atualizando arquivo .env..."
if grep -q "N8N_WEBHOOK_URL" .env; then
    # Substituir linha existente
    sed -i.bak "s|N8N_WEBHOOK_URL=.*|N8N_WEBHOOK_URL=$webhook_url|g" .env
else
    # Adicionar nova linha
    echo "N8N_WEBHOOK_URL=$webhook_url" >> .env
fi

echo ""
echo "✅ Configuração salva em .env"
echo ""
echo "📋 Configuração atual:"
cat .env
echo ""
echo "🚀 Para aplicar as mudanças:"
echo "   • Desenvolvimento: npm start"
echo "   • Docker: docker-compose restart web"
echo ""
