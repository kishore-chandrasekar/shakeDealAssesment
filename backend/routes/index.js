var express = require('express');
var router = express.Router();



let teams = [
  {
    id: 1,
    name: 'Team A',
    members: [
      { id: 1, name: 'Member 1', priority: 2 },
      { id: 2, name: 'Member 2', priority: 1 },
    ],
    lastAssignedIndex: 0,
  },
  {
    id: 2,
    name: 'Team B',
    members: [
      { id: 1, name: 'Member 1', priority: 2 },
      { id: 2, name: 'Member 2', priority: 3 },
      { id: 3, name: 'Member 3', priority: 1 },
    ],
    lastAssignedIndex: 0,
  },
  {
    id: 3,
    name: 'Team C',
    members: [
      { id: 1, name: 'Member 1', priority: 1 },
      { id: 2, name: 'Member 2', priority: 2 },
    ],
    lastAssignedIndex: 0,
  },
  {
    id: 4,
    name: 'Team D',
    members: [
      { id: 1, name: 'Member 1', priority: 2 },
      { id: 2, name: 'Member 2', priority: 1 },
    ],
    lastAssignedIndex: 0,
  },
  {
    id: 5,
    name: 'Team E',
    members: [
      { id: 1, name: 'Member 1', priority: 1 },
      { id: 2, name: 'Member 2', priority: 2 },
    ],
    lastAssignedIndex: 0,
  },

];

teams.map((e) => e.lastAssignedIndex = e.members.length - 1)

router.get('/getAllTeams', function (req, res, next) {
  try {
    const data = teams.map(team => ({ id: team.id, name: team.name }));
    console.log(data)
    res.send(data)
    res.end()
  } catch (error) {
    res.sendStatus(500)
  }
})
// hr@digiupaay.com
router.post('/assignTask', function (req, res, next) {
  const { taskDesc, teamId } = req.body;
  const team = teams.find(team => team.id === teamId);
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  const members = team.members;
  const numMembers = members.length;
  team.members = members.sort((a, b) => a.priority - b.priority);
  console.log(team)
  team.lastAssignedIndex = (team.lastAssignedIndex + 1) % numMembers;
  const assignedMember = members[team.lastAssignedIndex];
  return res.json({ assignedMember, taskDesc });

});

module.exports = router;
