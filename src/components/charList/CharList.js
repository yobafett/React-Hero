import { React, Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charList: [],
            loading: true,
            error: false,
            newItemsLoading: false,
            offset: 210,
            charsEnded: false
        }

        this.marvelService = new MarvelService();
        this.charRefs = [];
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true,
        })
    }

    onCharListLoaded = (newCharList) => {
        const charsEnded = newCharList.length < 9;

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charsEnded: charsEnded
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    addActiveCharRef = (charElem) => {
        this.charRefs.push(charElem);
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={this.addActiveCharRef}
                    data-charid={item.id}
                    onClick={() => {
                        this.charRefs.forEach(element => {
                            if (item.id === +element.dataset.charid) {
                                element.classList.add('char__item_selected');
                            } else {
                                element.classList.remove('char__item_selected');
                            }

                            this.props.onCharSelected(item.id);
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

    render() {

        const { charList, loading, error, newItemsLoading, offset, charsEnded } = this.state;

        const items = this.renderItems(charList);

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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}
export default CharList;