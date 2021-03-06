const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const methodOverride = require('method-override');
const gate = require('app/helpers/gate');
const rememberLogin = require('app/http/middleware/rememberLogin');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const csrf = require('csurf');
const csrfErrorHandler = require('app/http/middleware/csrfErrorHandler');
const activeUser = require('app/http/middleware/activeUser');
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
  }

  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port, () =>
      console.log(`Listening on port ${config.port}`)
    );
  }

  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }

  /**
   * Express Config
   */
  setConfig() {
    require('app/passport/passport-local');
    require('app/passport/passport-google');
    require('app/passport/passport-jwt');

    app.enable('trust proxy');
    app.use(helmet());
    app.use(compression());
    app.use(express.static(config.layout.public_dir));
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(methodOverride('_method'));
    app.use(validator());
    app.use(
      session({
        ...config.session
      })
    );
    app.use(cookieParser(config.cookie_secretkey));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(rememberLogin.handle);
    app.use(gate.middleware());

    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  setRouters() {
    app.use(activeUser.handle);
    app.use(require('app/routes/api'));

    // app.use(
    //   csrf({
    //     cookie: true
    //   }),
    //   require('app/routes/web')
    // );
    // Auth Router
    app.use(
      '/auth',
      redirectIfAuthenticated.handle,
      require('app/routes/web/auth')
    );
    app.use(csrfErrorHandler.handle);

    // Handle Production
    if (process.env.NODE_ENV === 'production') {
      // Static Folder
      app.use(express.static(path.join(__dirname, '..', 'dist/')));
      // Handle SPA
      app.get(/.*/, (req, res) =>
        res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
      );
    }
  }
};