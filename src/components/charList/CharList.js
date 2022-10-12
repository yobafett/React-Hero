import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const { process, setProcessConfirmed, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(setProcessConfirmed);
    }

    const onCharListLoaded = (newCharList) => {
        const charsEnded = newCharList.length < 9;

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 9);
        setCharsEnded(charsEnded);
    }

    const charRefs = useRef([]);

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <CSSTransition
                    key={item.id}
                    timeout={1000}
                    classNames="char__item">
                    <li
                        className="char__item"
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
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elem = useMemo(() => {
        return setContent(process, () => renderItems(charList), null, newItemsLoading);
    }, [process]);

    return (
        <div className="char__list">
            {elem}
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