import { Component,Fragment } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import './charListItem.sass';

class CharListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            loading: true,
            error: false,
        }
        this.marvelService = new MarvelService();
    }

    componentDidMount() {
        this.updateCharacter();
    }

    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false,
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    onLoadStart = () => {
        this.setState({
            loading: true,
            error: false,
        });
    }

    updateCharacter = () => {
        this.onLoadStart();

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const { character, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <View character={character} /> : null;

        return (
            <li className="char__item">
                {errorMessage}
                {spinner}
                {content}
            </li>
        )
    }
}

const View = ({ character }) => {
    const { name, thumbnail } = character;
    const hasPic = !thumbnail.includes('image_not_available');

    return (
        <Fragment>
            <img src={thumbnail} alt={name} style={{ objectFit: hasPic ? 'cover' : 'fill' }}/>
            <div className="char__name">{name}</div>
        </Fragment>
    );
}

export default CharListItem;

