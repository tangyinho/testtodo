'use strict'

var _list = []

exports.add = (resp, body) => {
    try {
        _list.push(body)
        let result = { 'code': 201, 'body': 'successfully' }
        resp.send(JSON.stringify(result))
    } catch (err) {
        let result = { 'code': 410, 'body': 'JSON Object required.' }
        resp.send(JSON.stringify(result))
    }
}

exports.list = (resp) => {
    const result =  { 'code': 200, 'body': _list.map((item, index) => ({ id: index, ...item }))}
    resp.send(JSON.stringify(result))
}

exports.remove = (resp, body) => {
    try {
        const result = JSON.parse(body);
        const taskToRemove = result.hasOwnProperty('task') ? result.task : null;
  
        if (taskToRemove === null) {
            const result = { 'code': 400, 'body': 'Task value is required.' };
            resp.send(JSON.stringify(result))
        }
  
        const index = _list.findIndex(item => item.task === taskToRemove);
  
        if (index !== -1) {
            _list.splice(index, 1);
            const result = { 'code': 201, 'body': 'Successfully' };
            resp.send(JSON.stringify(result))
        } else {
            const result = { 'code': 400, 'body': 'Task not found.' };
            resp.send(JSON.stringify(result))
        }
    } catch (err) {
        const result = { 'code': 410, 'body': 'JSON Object required.' };
        resp.send(JSON.stringify(result))
    }
}