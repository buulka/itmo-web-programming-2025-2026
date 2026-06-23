import express from 'express';
import appSrc from './app.js';

const app = appSrc(express);

app.listen(process.env.PORT);