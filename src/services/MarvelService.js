
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _publicApiKey = '39465c8d63a61ca6ac0c67d687cf9e5c'; //b90c55f457984c184d203f60e15d9eec7d951ca5
    _baseOffset = 210;

    getResources = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Fetch error ${url}. Status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const result = await this.getResources(`${this._apiBase}/characters?limit=9&offset=${offset}&apikey=${this._publicApiKey}`);
        return result.data.results.map(this._transformCharacterData);
    } 

    getCharacter = async (id) => {
        const result = await this.getResources(`${this._apiBase}/characters/${id}?apikey=${this._publicApiKey}`);
        return this._transformCharacterData(result.data.results[0]);
    }

    _transformCharacterData = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }
}

export default MarvelService;