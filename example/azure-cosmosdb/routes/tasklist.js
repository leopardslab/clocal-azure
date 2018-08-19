let DocumentDBClient = require('documentdb').DocumentClient;
const async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}

TaskList.prototype = {
  showTasks: function(req, res) {
    let self = this;

    let querySpec = {
      query: 'SELECT * FROM root r WHERE r.completed=@completed',
      parameters: [{
        name: '@completed',
        value: false
      }]
    };

    self.taskDao.find(querySpec, function(err, items) {
      if (err) {
        throw (err);
      }

      res.render('index', {
        title: 'My ToDo List ',
        tasks: items
      });
    });
  },

  addTask: function(req, res) {
    let self = this;
    let item = req.body;

    self.taskDao.addItem(item, function(err) {
      if (err) {
        throw (err);
      }

      res.redirect('/');
    });
  },

  completeTask: function(req, res) {
    let self = this;
    let completedTasks = Object.keys(req.body);

    async.forEach(completedTasks, function taskIterator(completedTask, callback) {
      self.taskDao.updateItem(completedTask, function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }, function goHome(err) {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  }
};

module.exports = TaskList;
