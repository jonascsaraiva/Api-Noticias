const express = require('express');
const app = express();

app.use(express.json()); 

// Simulação de banco de dados em memória
let news = [
  {
    id: 1,
    title: 'Pessoas Encontradas ao Ar Livre Ficam Surpesas',
    body: 'Em seu primeiro pequenique, pessoas esqueceram das uvas em casa,porém não desanimaram coom isso.',
    author: 'João Silva',
    date: '2024-09-26'
  },
  {
    id: 2,
    title: 'Eleições de 2024',
    body: 'Cobertura completa de Gledson vs Bixa Muda',
    author: 'Maria Souza',
    date: '2024-09-25'
  }
];

// Listar todas as notícias
app.get('/news', (req, res) => {
  res.json(news);
});

// Obter uma notícia específica pelo ID
app.get('/news/:id', (req, res) => {
  const article = news.find(n => n.id == req.params.id);
  if (!article) {
    return res.status(404).send('Notícia não encontrada');
  }
  res.json(article);
});

// Criar uma nova notícia
app.post('/news', (req, res) => {
  const { title, body, author } = req.body;
  
  // Validação simples
  if (!title || !body || !author) {
    return res.status(400).send('Todos os campos (título, corpo, autor) são obrigatórios');
  }

  const newArticle = {
    id: news.length + 1,
    title,
    body,
    author,
    date: new Date().toISOString().split('T')[0] // Data atual
  };

  news.push(newArticle);
  res.status(201).json(newArticle);
});

// Atualizar uma notícia existente
app.put('/news/:id', (req, res) => {
  const article = news.find(n => n.id == req.params.id);
  if (!article) {
    return res.status(404).send('Notícia não encontrada');
  }

  const { title, body, author } = req.body;
  
  // Atualizando apenas os campos enviados
  article.title = title || article.title;
  article.body = body || article.body;
  article.author = author || article.author;
  res.json(article);
});

// Deletar uma notícia
app.delete('/news/:id', (req, res) => {
  const articleIndex = news.findIndex(n => n.id == req.params.id);
  if (articleIndex === -1) {
    return res.status(404).send('Notícia não encontrada');
  }

  news.splice(articleIndex, 1);
  res.status(204).send(); 
// Nenhum conteúdo retornado após a exclusão
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);
});