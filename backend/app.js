require('reflect-metadata');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./src/routes/auth.routes'));
// app.use('/products', authenticateToken, productRoutes);
app.use('/api/products', require('./src/routes/product.routes'));
app.use('/api/product-attributes', require('./src/routes/productAttribute.routes'));
app.use('/api/product-journeys', require('./src/routes/productJourney.routes'));
app.use('/api/product-journey-attributes', require('./src/routes/productJourneyAttribute.routes'));
app.use('/api/product-journey-templates', require('./src/routes/productJourneyTemplate.routes'));
app.use('/api/product-types', require('./src/routes/productType.routes'));
app.use('/api/product-templates', require('./src/routes/productTemplate.routes'));
app.use('/api/suppliers', require('./src/routes/supplier.routes'));
app.use('/api/supplier-attributes', require('./src/routes/supplierAttribute.routes'));
app.use('/api/supplier-templates', require('./src/routes/supplierTemplate.routes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
