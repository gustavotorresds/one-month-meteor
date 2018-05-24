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


// FlowRouter.route('/recipe-book', {
//     name: 'recipe-book',
//     action() {
//         BlazeLayout.render('MainLayout', {main: 'Recipes'});
//     }
// });