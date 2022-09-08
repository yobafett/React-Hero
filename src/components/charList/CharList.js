import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import CharListItem from '../charListItem/charListItem';
import nextId from "react-id-generator";

const CharList = () => {
    const charsCount = 9;
    const chars = [];

    for (let i = 0; i < charsCount; i++) {
        chars.push(<CharListItem key={nextId()}/>)
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {chars}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;