/*
 * TODO: add city/age restrictions. Showing a list of cities would be ideal.
 * TODO: if we decide to go with useracconutns package, remove this commented
 * out code bellow.
 */
// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_AND_EMAIL',
// });

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
    },
    {
        _id: 'age',
        type: 'text',
        displayName: 'Age',
        required: true
    },
    {
        _id: 'city',
        type: 'text',
        displayName: 'City',
        required: true
    }
]);