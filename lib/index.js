var path = require('path'),
    express = require('express'),
    swig = require('swig'),
    ascii_art = require('./ascii_art');

/**
 * The path of core directory of Knot.
 *
 * @type {String}
 */
var _base_dir = path.dirname(require.main.filename);

/**
 * The default config object.
 *
 * @type {Object}
 */
var default_config = {
  modules:                [],
  middlewares:            [],
  debug:                  false,
  testing:                false,
  base_dir:               _base_dir,
  tempate_dir:            path.join(_base_dir, 'templates'),
  static_dir:             path.join(_base_dir, 'static'),
  static_router_base:     '/static',
  module_dir:             path.join(_base_dir, 'modules'),
  middleware_dir:         path.join(_base_dir, 'middlewares'),
  secret_key:             null,
  session_cookie_name:    'session',
  session_cookie_domain:  null,
  session_cookie_path:    null,
  max_content_length:     null,
  send_file_max_age:      12 * 60 * 60  // 12 houres
};

/**
 * Base class for our framework.
 *
 * @class Knot
 * @constructor
 * @module knot
 */
var Knot = module.exports = function Knot(config) {
  /**
   * The application instance.
   *
   * @property app
   * @type {Object}
   * @final
   */
  var app = this.app = express();

  app.config = default_config;
  config = config || [];
  Object.keys(config).forEach(function(key) {
    app.config[key] = config[key];
  });

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', app.config.tempate_dir);
  app.set('view cache', !!app.config.debug);

  app.use(express.logger());
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.config.static_router_base, express.static(app.config.static_dir));
  app.use(app.router);

  if (app.config.debug) {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.locals.pretty = true;
  }

   // Assign a 'current_app' attribute to the request context.
  app.use(function(req, res, next) {
    req.current_app = app;
    next();
  });

  // Load middlewares
  app.config.middlewares.forEach(function(middleware) {
    app.use(require(app.config.middleware_path));
  });

  // Load modules
  app.config.modules.forEach(function(module) {
    require(path.join(app.config.module_dir, module)).init(app);
  });

  // If no modules at all
  if (app.config.modules.length === 0) {
    app.use(function(req, res) {
      res.end('No MODULE registered, please review your project and make sure at least one module is registered.');
    });
  }

  return this;
};

/**
 * Run application.
 *
 * @method run
 * @param {Number} port
 * @chainable
 */
Knot.prototype.run = function(port) {
  port = port || 3000;    // 3000 is the default port.
  this.app.listen(port);
  if (this.app.config.debug) {
    console.log('----------------------------------------');
    console.log('Application running in DEBUG mode.');
    console.log('Listening on port %d.\n', port );
    ascii_art.draw();
    console.log('----------------------------------------');
  }

  return this;
};
