function getQueryStringValue(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function getToken(){
    // Extract from URL
    const authorizationCode = getQueryStringValue('code');

    if (authorizationCode) {
        const clientId = '4gmgk2jsffdjtlr6bk8p39568t';
        const redirectUri = 'http://localhost/callback.html';
        
        const data = {
            grant_type: 'authorization_code',
            client_id: clientId,
            code: authorizationCode,
            redirect_uri: redirectUri
        };
        exchangeCodeForTokens();
    }else {
            console.error('Authorization code not found');
    }   
}

async function exchangeCodeForTokens() {
    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        const tokens = await response.json();

    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('id_token', tokens.id_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    window.location.href = 'main.html'
    }catch (error) {                    
        console.error('Error exchanging code for tokens:', error);
    }
}