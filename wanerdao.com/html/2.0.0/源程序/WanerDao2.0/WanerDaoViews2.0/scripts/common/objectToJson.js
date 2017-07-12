
function toJson(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for (var key in arr) {
        var value = arr[key];
        if (typeof value == "object") {
            parts.push(toJson(value));
        } else if (typeof value == "function") {
            value = value.toString()
                              .replace(/(\n[\s|\t]*\r*\n)/g, '')
                              .replace(/\n|\r|(\r\n)/g, '')
                              .replace(/\s{2,}/, '')
                              .replace(/"/, '\"');
            parts.push('\"' + value + '\"');
        } else {
            var str = "";
            if (!is_list) {
                key = key.replace(/"/, '\"');
                str = '\"' + key + '\":';
            }

            //Custom handling for multiple data types
            if (typeof value == "number") {//Numbers
                str += value;
            } else if (value === false) {//The booleans false
                str += 'false';
            } else if (value === true) {//The booleans true
                str += 'true';
            } else {//string
                value = value.replace(/"/, '\"');
                str += '\"' + value + '\"';
            }
            parts.push(str);
        }
    }
    var json = parts.join(",");
    if (is_list) return '[' + json + ']'; //array
    return '{' + json + '}'; //object
}