FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
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


// FlowRouter.route('/recipe-book', {
//     name: 'recipe-book',
//     action() {
//         BlazeLayout.render('MainLayout', {main: 'Recipes'});
//     }
// });