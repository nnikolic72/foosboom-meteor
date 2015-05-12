/**
 * Created by n.nikolic on 5/12/2015.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {name: 'games', waitOn: function(){
        return [Meteor.subscribe("games"), Meteor.subscribe("teams")];
    }}
    , function() {
        this.render('games');
    });

Router.route('/teams', { waitOn: function(){
        return Meteor.subscribe("teams");
    }}
    , function() {
        this.render('teams');
    });

var requireLogin = function(){
    if(!Meteor.user()){
        this.render("accessDenied");
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin);
