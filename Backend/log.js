exports.normalLog = function (originalUrl,method,token,message) {
    const date = new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    console.log('Time:', date, '\n  Route: ', originalUrl, '\n  Method: ', method, '\n  Token: ', token, '\n  Message:', message, '\n');
}