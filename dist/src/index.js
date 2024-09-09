"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const repairCodes = {
    navigation: 'NAV-01',
    communications: 'COM-02',
    life_support: 'LIFE-03',
    engines: 'ENG-04',
    deflector_shield: 'SHLD-05',
};
let damagedSystem;
app.get('/status', (req, res) => {
    const damagedSystems = Object.keys(repairCodes);
    damagedSystem = damagedSystems[Math.floor(Math.random() * damagedSystems.length)];
    res.json({ damaged_system: damagedSystem });
});
app.get('/repair-bay', (req, res) => {
    const repairCode = repairCodes[damagedSystem];
    if (typeof repairCode !== 'string') {
        return res.send("You have to get the status first");
    }
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Repair</title>
    </head>
    <body>
    <div class="anchor-point">${repairCode}</div>
    </body>
    </html>
  `;
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
});
app.post('/teapot', (req, res) => {
    res.sendStatus(418);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
