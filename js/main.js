const privateKey = 'e33b74e2405f5d004afef3fbb54588a5925201d0',
    publicKey = '7f2a531ed11c01ab6a79eb629c784447',
    content = document.getElementById('content');
search = document.getElementById('search');

const getConnection = () => {
    const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e));
};

const drawHero = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
    <div class="ed-item l-1-3 hero">
        <h1>${e.name}</h1>
        <div class="hero-img">
            <img class="thumbnail" src="${image}">
            <p class="description">${e.description}</p>
        </div>
    </div>
    `;
    content.insertAdjacentHTML('beforeEnd', hero)
};


const searchHero = name => {
    const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        hero = encodeURIComponent(name),
        URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e));
}

search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        content.innerHTML = "";
        searchHero(e.target.value.trim());
    }
});

getConnection();

