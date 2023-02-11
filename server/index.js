const colors = require('colors/safe');
const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const APIError = require('./apiError');
const Config = require('./config');
const routes = require('./routes');

const app = new Koa();
const router = new Router();

// static files
app.use(serveStatic('./build'));

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  if (err instanceof APIError) {
    console.log(`API Error: ${err.status} - ${err.message}`);
  } else {
    console.error(err);
  }
});

// middleware
app.use(bodyParser());

// routes
routes.install(router);
app.use(router.routes()).use(router.allowedMethods());

const port = Config.server.port;
app.listen(port);
console.log(colors.green.bold(`Server listening on port ${port}`));
