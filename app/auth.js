function checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');
    if (!accessToken || ! idToken) {
        console.log('No access token found, redirecting to index.html');
        window.location.href = 'index.html';
    } else {
        const userInfo = decryptAT(idToken);        
        document.getElementById('usernameDisplay').innerText = 'Logged in as: ' + userInfo.email;
    }
}

function decryptAT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function logout() {
    console.log('Initiating Cognito logout and clearing tokens');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('captchaValidated');
    const cognitoDomain = 'https://onboardingtag16.auth.ap-southeast-2.amazoncognito.com/logout';
    const clientId = '4gmgk2jsffdjtlr6bk8p39568t';
    const logoutUri = encodeURIComponent('http://127.0.0.1/logout.html');
    const url = `${cognitoDomain}?client_id=${clientId}&logout_uri=${logoutUri}`;
    window.location.href = url;
}

window.onload = checkAuthentication;
