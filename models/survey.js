
// TODO: var db = require('../db');

function Survey() {

};

module.exports = Survey;

Survey.get = function(id) {
    if(!id) return;
    
    return survey1;
};

var survey1 = {
    id: 1,
    name: '调查1',
    
    questions: [{
        id: 1,
        title: '问题1',
        type: 'radio',
        items: [1,2],
    },
    {
        id: 2,
        title: '问题2',
        type: 'checkbox',
        items: [1,2],
    },
    {
        id: 3,
        title: '问题3',
        type: 'select',
        items: [1,2],
    },
    {
        id: 4,
        title: '问题4',
        type: 'input'
    }]
};

survey1.items = {};
survey1.items[1] = '好';
survey1.items[2] = '不好';