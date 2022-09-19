import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();

        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        const charsEnded = newCharList.length < 9;

        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 9);
        setCharsEnded(charsEnded);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const charRefs = useRef([]);

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={(charElem) => charRefs.current[i] = charElem}
                    data-charid={item.id}
                    onClick={() => {
                        charRefs.current.forEach(element => {
                            if (item.id === +element.dataset.charid) {
                                element.classList.add('char__item_selected');
                            } else {
                                element.classList.remove('char__item_selected');
                            }

                            props.onCharSelected(item.id);
                        });
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ display: charsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}
export default CharList;