const {Router} = require('express');
const groupRouter = Router();
const {
  getUserGroup,
  addGroup,
  deleteGroup,
  updateGroup,
} = require('../controllers/groupController');

groupRouter.post('/get', (req, res) => {
  const groups = getUserGroup(req.body.username);
  res.status(200).send({
    status: 'success',
    data: groups,
  });
});

groupRouter.post('/add', (req, res) => {
  const {groupName, username} = req.body;
  addGroup(username, groupName);
  res.status(200).send({
    status: 'success',
    message: 'add group success',
  });
});

groupRouter.post('/update', (req, res) => {
  updateGroup(req.body);
  setTimeout(() => {
    res.status(200).send({
      status: 'success',
      message: 'update group success',
    });
  }, 1000);
});

groupRouter.delete('/delete', (req, res) => {
  const {groupId} = req.body;
  deleteGroup(groupId);
  res.status(200).send({
    status: 'success',
    message: 'delete group success',
  });
})



module.exports = groupRouter;
