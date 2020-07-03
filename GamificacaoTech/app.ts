import debug = require('debug');
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser')
import fileupload = require("express-fileupload")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require("express-ejs-layouts"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());
app.use(fileupload())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.resolve('./public'))); 

app.use('/', require("./routes/home"))
app.use('/admin', require("./routes/admin"))
app.use("/api/usuario", require("./routes/api/usuario"))
app.use("/api/projeto", require("./routes/api/projeto"))
app.use("/api/achievement", require("./routes/api/achievement"))
app.use("/api/achievementUsuario", require("./routes/api/achievementUsuario"))
app.use("/api/item", require("./routes/api/item"))
app.use("/api/itemUsuario", require("./routes/api/itemUsuario"))
app.use("/api/habilidade", require("./routes/api/habilidade"))
app.use("/api/area", require("./routes/api/area"))
app.use("/api/curso", require("./routes/api/curso"))
app.use("/api/tipoProjeto", require("./routes/api/tipoProjeto"))
app.use("/api/tipoHabilidade", require("./routes/api/tipoHabilidade"))
app.use("/api/cidade", require("./routes/api/cidade"))
app.use("/api/pais", require("./routes/api/pais"))
app.use("/api/estado", require("./routes/api/estado"))
app.use("/api/endereco", require("./routes/api/endereco"))
app.use("/api/nacionalidade", require("./routes/api/nacionalidade"))
app.use("/api/dadosCurriculo", require("./routes/api/dadosCurriculo"))
app.use("/api/noticia", require("./routes/api/noticia"))

// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});