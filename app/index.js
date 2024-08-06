function enableLoginButton() {
    document.getElementById('login-button').disabled = false;
}

function redirectToLogin() {
        window.location.href = 'https://onboardingtag16.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?client_id=4gmgk2jsffdjtlr6bk8p39568t&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback.html'
}

function redirectToAboutUs() {
    window.location.href = 'aboutUs.html'
}
