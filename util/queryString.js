module.exports = (options) => {
    var str = [];
    for(var p in options) {
        if (options.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(options[p]));
        }
    }
    return `?${str.join("&")}`;
}
