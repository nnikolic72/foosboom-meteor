/**
 * Created by n.nikolic on 5/11/2015.
 */

Meteor.publish('teams', function(){
    return Teams.find({});
});