Accounts.onLogin(function() {
    FlowRouter.go('timeline');
});

Accounts.onLogout(function() {
    FlowRouter.go('home');
});

FlowRouter.route('/', {
    name: 'home',
    action() {
        if(Meteor.userId()) {
            FlowRouter.go('timeline');
        } else {
            BlazeLayout.render('HomeLayout');
        }
    }
});

FlowRouter.route('/timeline', {
    name: 'timeline',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Timeline'});
    }
});

FlowRouter.route('/users/:id', {
    name: 'userProfile',
    action() {
        BlazeLayout.render('MainLayout', {main: 'UserProfile'});
    }
});
