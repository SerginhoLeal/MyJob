module.exports = function parseString(arrayAsString){
    return arrayAsString.split(',').map(no => no.trim());
}