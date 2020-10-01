'use strict';
function newOption (dataObj) {
    dataObj.updated = true;
    dataObj.lol = 12554;
    return dataObj;
}
module.exports = {
    newOption: newOption
};