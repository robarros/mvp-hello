# Hello - MVP Operadora de Telefonia Móvel

## 📱 Sobre o Projeto

Este é um MVP (Minimum Viable Product) de uma página web para operadora de telefonia móvel, desenvolvida com HTML, CSS e JavaScript puro. A página inclui um chatbot integrado pronto para conectar com N8N.

## ✨ Funcionalidades

- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Seções Principais**:
  - Hero com chamada para ação
  - Planos de telefonia móvel (Básico, Premium, Ultra)
  - Serviços de telefonia móvel oferecidos
  - Formulário de contato
  - Footer com informações e redes sociais

- **Chatbot Inteligente**:
  - Interface moderna e intuitiva
  - Respostas automáticas locais (fallback)
  - Pronto para integração com N8N
  - Identificação de sessão única
  - Respostas contextuais sobre planos, cobertura, instalação, etc.

## 🚀 Como Usar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Navegue pelas seções da página
3. Clique no ícone de chat no canto inferior direito para abrir o chatbot
4. Teste as interações com o chatbot

## 🔗 Integração com N8N

### Passo 1: Configurar Webhook no N8N

1. Acesse sua instância do N8N
2. Crie um novo workflow
3. Adicione um nó "Webhook"
4. Configure o método como POST
5. Copie a URL do webhook

### Passo 2: Configurar a Página

1. Abra o arquivo `script.js`
2. Encontre a linha:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://seu-n8n-instance.com/webhook/chat';
   ```
3. Substitua pela URL do seu webhook do N8N

### Passo 3: Estrutura de Dados Enviados

O chatbot envia os seguintes dados para o N8N:

```json
{
  "message": "Mensagem do usuário",
  "timestamp": "2025-11-08T10:30:00.000Z",
  "sessionId": "session_1730000000000_abc123"
}
```

### Passo 4: Exemplo de Workflow N8N

Sugestão de nós para o workflow:

1. **Webhook** - Recebe a mensagem
2. **Function** - Processa a mensagem e define a resposta
3. **HTTP Response** - Retorna a resposta para o chatbot

Exemplo de código para o nó Function:
```javascript
// Processa a mensagem
const message = items[0].json.message.toLowerCase();
let response = '';

if (message.includes('plano')) {
  response = 'Temos 3 planos de telefonia móvel disponíveis: Básico (R$ 79), Premium (R$ 129) e Ultra (R$ 199). Qual você gostaria de saber mais?';
} else if (message.includes('contato')) {
  response = 'Você pode ligar para 0800 123 4567 ou enviar email para contato@hello.com.br';
} else {
  response = 'Como posso ajudá-lo? Posso falar sobre planos móveis, ativação de chip, cobertura ou atendimento.';
}

return {
  json: {
    response: response,
    timestamp: new Date().toISOString()
  }
};
```

## 📝 Personalização

### Alterar Cores

No arquivo `styles.css`, modifique as variáveis CSS:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
}
```

### Alterar Logo

Substitua o arquivo `hello.jpeg` pela logo da sua empresa (mantenha o mesmo nome ou atualize a referência no HTML).

### Alterar Textos

Edite o arquivo `index.html` para personalizar:
- Nome da empresa
- Textos das seções
- Preços dos planos
- Informações de contato

### Adicionar Mais Respostas ao Chatbot

No arquivo `script.js`, adicione mais condições na função `getBotResponse()`:

```javascript
if (lowerMessage.includes('sua_palavra_chave')) {
    return 'Sua resposta personalizada';
}
```

## 🎨 Recursos Visuais

- Ícones: Font Awesome 6.4.0
- Animações suaves
- Gradientes modernos
- Sombras e efeitos hover
- Design Material Design inspirado

## 📱 Compatibilidade

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)
- Responsivo para dispositivos móveis

## 🔧 Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+
- Font Awesome Icons

## 📈 Próximos Passos

- [ ] Integrar com backend para formulário de contato
- [ ] Adicionar painel administrativo
- [ ] Implementar sistema de tickets
- [ ] Adicionar mais idiomas
- [ ] Integrar com CRM
- [ ] Adicionar chat em tempo real

## 📄 Licença

Este é um projeto MVP desenvolvido para demonstração.

## 👥 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato através do chatbot na página ou via email.

---

Desenvolvido com ❤️ para Hello
