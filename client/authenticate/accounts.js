/*
 * TODO: add city/age restrictions. Showing a list of cities would be ideal.
 * TODO: if we decide to go with useracconutns package, remove this commented
 * out code bellow.
 */
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');

AccountsTemplates.addFields([
    {
        _id: 'username',
        type: 'text',
        displayName: 'username',
        required: true,
        minLength: 5,
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email',
    },
    pwd,
    {
        _id: 'name',
        type: 'text',
        displayName: 'Name',
        required: true
    }
]);

AccountsTemplates.configure({
    defaultLayoutType: 'blaze',
    defaultLayout: 'MainLayout',
    defaultLayoutRegions: {
        nav: 'Header'
    },
    defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
