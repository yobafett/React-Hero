import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _publicApiKey = '39465c8d63a61ca6ac0c67d687cf9e5c'; //b90c55f457984c184d203f60e15d9eec7d951ca5
    const _baseCharOffset = 210;
    const _baseComicsOffset = 0;

    const getAllCharacters = async (offset = _baseCharOffset) => {
        const result = await request(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_publicApiKey}`);
        return result.data.results.map(_transformCharacterData);
    }

    const getCharacter = async (id) => {
        const result = await request(`${_apiBase}/characters/${id}?apikey=${_publicApiKey}`);
        return _transformCharacterData(result.data.results[0]);
    }

    const findCharacter = async (searchString) => {
        const result = await request(`${_apiBase}/characters?nameStartsWith=${searchString}&apikey=${_publicApiKey}`);

        if(result.data.count > 0){
            return result.data.results.map(_transformCharacterData);
        } else {
            return [];
        }
    }

    const _transformCharacterData = (character) => {
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

    const getAllComics = async (offset = _baseComicsOffset) => {
        const result = await request(`${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_publicApiKey}`);
        return result.data.results.map(_transformComicsData);
    }

    const getComic = async (id) => {
        const result = await request(`${_apiBase}/comics/${id}?apikey=${_publicApiKey}`);
        return _transformComicsData(result.data.results[0]);
    };

    const _transformComicsData = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            description: comics.description,
            pageCount: comics.pageCount,
            language: comics.textObjects.language || 'en-us',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        }
    }

    return { loading, error, getAllCharacters, getCharacter, findCharacter, clearError, getAllComics, getComic };
}

export default useMarvelService;