const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const webpackConfig = require('./webpack.config.js');
const http = require ('http');
const httpProxy = require("http-proxy");
const connect = require('connect');
const getODCPartnerId = require('./lib/util').getODCPartnerId;
const path = require ('path');

let config = require("./config.json");

/*
 * We want to intitiate a Webpack watcher and give it an in-memory file store
 * This will allow us to watch for changes and rebuild, but not mess with the dist folder
 * It's like magic!
 */
const compiler = webpack(webpackConfig);
const fs = new MemoryFS();

compiler.outputFileSystem = fs;
const watching = compiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => { // Stats Object
  // Print watch/build result here...
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});


/*
 *
 * Initiate a proxy server
 * 1. Pull from trailblazer
 * 2. Edit response from server with locale webpack content
 * 3. Return to user
 */
const proxy = httpProxy.createProxyServer({
  target: 'https://trailblazer.outdoorsy.co',
  changeOrigin: true,
  xfwd: true,
  toProxy: true,
  selfHandleResponse: true, // we'll be handling our own response
  headers: {
    'ODC-PARTNER-ID': getODCPartnerId(config.lang)
  }
});

proxy.on('proxyRes', function (proxyRes, req, res) {

  var body = new Buffer.from('');
  proxyRes.on('data', function (data) {
      body = Buffer.concat([body, data]);
  });
  proxyRes.on('end', function () {
    body = body.toString();
    let header = fs.readFileSync(path.join(__dirname, '/dist/header.html')).toString();
    let head = fs.readFileSync(path.join(__dirname, '/dist/head.html')).toString().replace('<head>', '').replace('</head>', '');
    let footer = fs.readFileSync(path.join(__dirname, '/dist/footer.html')).toString();
    res.end(
      body.replace('<!-- trailblazer_footer -->', footer)
        .replace('<!-- trailblazer_header -->', header)
        .replace('<!-- trailblazer_head -->', head)
    );
  });
});

/*
 *
 * Last but not least, create the server
 */
const app = connect();

app.use(function (req, res) {
  // we don't want to gzip the response
  delete req.headers['accept-encoding'];
  proxy.web(req, res);
});

http.createServer(app).listen(5050);
