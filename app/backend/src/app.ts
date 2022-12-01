import 'express-async-errors';
import * as express from 'express';
import RouterUser from './routers/User.router';
import RouterTeam from './routers/Teams.routers';
import RouterMatches from './routers/Matches.routers';
import httpErrorMiddleware from './middlewares/erro.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/login', RouterUser);
    this.app.use('/teams', RouterTeam);
    this.app.use('/matches', RouterMatches);
    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
