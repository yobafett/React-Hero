
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _publicApiKey = '60abcc05733d85dc2244211b21bb04f7';

    getResources = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Fetch error ${url}. Status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const result = await this.getResources(`${this._apiBase}/characters?limit=9&offset=210&apikey=${this._publicApiKey}`);
        return result.data.results.map(this._transformCharacterData);
    } 

    getCharacter = async (id) => {
        const result = await this.getResources(`${this._apiBase}/characters/${id}?apikey=${this._publicApiKey}`);
        return this._transformCharacterData(result.data.results[0]);
    }

    _transformCharacterData = (character) => {
        return {
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
        }
    }
}

export default MarvelService;