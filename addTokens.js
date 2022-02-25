async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

async function addTokens() {
    const add_tokens = prompt('How many tokens do you want to add to your account? (1000 daily)');
    const myToken = localStorage.token.split('JWT ')[1];

    if (add_tokens > 1000) {
        alert('You can add up to 1000 tokens daily')
    }

    const response = await fetch('https://api.blooket.com/api/users/add-rewards', {
        method: "PUT",
        headers: {
            "referer": "https://www.blooket.com/",
            "content-type": "application/json",
            "authorization": localStorage.token
        },
        body: JSON.stringify({
            name: await getName(myToken),
            addedTokens: add_tokens,
            addedXp: 500
        })
    });

    if (response.status == 500) {
        alert(`${add_tokens} added to your account!`);
    } else {
        alert('An error occured.');
    };

};

addTokens();
