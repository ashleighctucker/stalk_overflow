const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public'))); // telling express it is using pub files to manipulate DOM
