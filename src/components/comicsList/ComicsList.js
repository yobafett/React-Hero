import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        const comicsEnded = newComicsList.length < 8;

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 9);
        setComicsEnded(comicsEnded);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li className="comics__item" key={arr.length + i}>
                    <Link to={`/comics/${item.id}`}>
                        <img className="comics__item-img" src={item.thumbnail} alt={item.name} style={imgStyle} />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;