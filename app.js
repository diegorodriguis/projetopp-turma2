const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const projectRoutes = require('./routes/project');
const meetingRoutes = require('./routes/meeting');
const updateRoutes = require('./routes/update');
const documentRoutes = require('./routes/document');
const { authenticateJWT } = require('./service/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Swagger setup
const swaggerDocument = JSON.parse(fs.readFileSync('./resources/swagger.json', 'utf8'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/project', authenticateJWT, projectRoutes);
app.use('/meeting', authenticateJWT, meetingRoutes);
app.use('/update', authenticateJWT, updateRoutes);
app.use('/document', authenticateJWT, documentRoutes);

app.get('/', (req, res) => {
  res.send('API de acompanhamento de projetos de arquitetura');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
