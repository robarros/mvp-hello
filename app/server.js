const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: false, // Desabilitado para permitir CDN externos
    crossOriginEmbedderPolicy: false
}));

// Middleware de compressão
app.use(compression());

// CORS - Permite requisições de qualquer origem (ambiente de teste)
app.use(cors({
    origin: '*', // Permite todas as origens
    credentials: false, // Não permitir credenciais com origin *
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d', // Cache de 1 dia para arquivos estáticos
    etag: true
}));

// Rota principal
app.get('/', (req, res) => {
    // Ler o arquivo HTML
    const htmlPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao carregar página');
        }
        
        // Substituir a URL do webhook do n8n
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://54.152.73.181:9090/webhook/f3f7af14-50c8-4fd0-8bd0-ac80b83660d5/chat';
        const modifiedHtml = data.replace(
            /webhookUrl:\s*['"][^'"]*['"]/g,
            `webhookUrl: '${n8nWebhookUrl}'`
        );
        
        res.send(modifiedHtml);
    });
});

// Rota para obter configurações (incluindo webhook do n8n)
app.get('/api/config', (req, res) => {
    res.json({
        n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || 'http://54.152.73.181:9090/webhook/f3f7af14-50c8-4fd0-8bd0-ac80b83660d5/chat'
    });
});

// Rota de health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Rota para API - exemplo de endpoint para contato
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Aqui você pode adicionar lógica para salvar no banco de dados
    // ou enviar para um serviço de e-mail
    console.log('Contato recebido:', { name, email, phone, message });
    
    res.json({ 
        success: true, 
        message: 'Mensagem recebida com sucesso!' 
    });
});

// Tratamento de erro 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Algo deu errado!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Hello rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido. Encerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT recebido. Encerrando servidor...');
    process.exit(0);
});
