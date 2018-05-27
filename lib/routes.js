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
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action() {
        BlazeLayout.render('MainLayout', {main: 'Timeline'});
    }
});

FlowRouter.route('/users/edit', {
    name: 'editProfile',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action() {
        BlazeLayout.render('MainLayout', {main: 'EditProfile'});
    }
});

FlowRouter.route('/users/:id', {
    name: 'userProfile',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action() {
        BlazeLayout.render('MainLayout', {main: 'UserProfile'});
    }
});
