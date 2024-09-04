import express, { Request, Response } from 'express';


const app = express();
const port = 3000;

const repairCodes: { [key: string]: string } = {
  navigation: 'NAV-01',
  communications: 'COM-02',
  life_support: 'LIFE-03',
  engines: 'ENG-04',
  deflector_shield: 'SHLD-05',
};

let damagedSystem : string;

app.get('/status', (req: Request, res: Response) => {
  const damagedSystems = Object.keys(repairCodes);
  damagedSystem = damagedSystems[Math.floor(Math.random() * damagedSystems.length)];
  res.json({ damaged_system: damagedSystem });
});

app.get('/repair-bay', (req: Request, res: Response) => {
  const repairCode = repairCodes[damagedSystem];
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

app.post('/teapot', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});