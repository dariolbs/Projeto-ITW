// Variaveis
//
"use strict"

const USER_EMAIL_KEY = "bejewel_user_email"
const USER_PASSWORD_KEY  = "bejewel_user_password"

function saveLogin()
{
    let user_email      = login_form.elements.email.value;
    let user_password   = login_form.elements.senha.value;

    localStorage.setItem(USER_EMAIL_KEY, user_email);
    localStorage.setItem(USER_PASSWORD_KEY, user_password);
}
