/**
 * Created by n.nikolic on 5/11/2015.
 */

Meteor.startup(function () {
    var dummyUserEmail = 'test@test.com';

    if (Meteor.users.find({"emails.address": dummyUserEmail}).count() == 0) {

        // Create a test user. `createUser` returns the id of the created user
        var ownerId = Accounts.createUser({
            email: dummyUserEmail,
            password: 'matthew'
        });
    }

    if (Teams.find().count() === 0) {
        [
            {name: "Barcelona"
                , gameIds: []
                , ownerId: ownerId
            },
            {name: "Real Madrid"
                , gameIds: []
                , ownerId: ownerId
            },
            {name: "Matt's team"
                , gameIds: []
                , ownerId: ownerId
            }
        ].forEach(function(team){
                Teams.insert(team);
            });
    }

    if (Games.find().count() === 0) {
        // Create a game
        var team1 = Teams.find().fetch()[0];
        var team2 = Teams.find().fetch()[1];

        var game = {
            completed: false,
            createdAt: new Date(),
            teams: [
                {name: team1.name, _id: team1._id, score: 0},
                {name: team2.name, _id: team2._id, score: 0}
            ],
            ownerId: ownerId
        };

        Games.insert(game, function addGameIds(error, _id) {
            if (error) return error;
            Teams.update({_id: team1._id}, {$addToSet: { gameIds:  _id}});
            Teams.update({_id: team2._id}, {$addToSet: { gameIds:  _id}});
        });

        // Add this game to both teams gameIds

    }
});