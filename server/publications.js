/**
 * Created by n.nikolic on 5/11/2015.
 */

Meteor.publish('teams', function(){
    return Teams.find({ownerId: this.userId});
});

Meteor.publish('games', function(){
    return Games.find({ownerId: this.userId});
});