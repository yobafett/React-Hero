import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './single.scss';

const Single = (props) => {
    const [contentData, setContentData] = useState(null);
    const { comicId, charId } = props;
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateContentData();
    }, [props.comicId, props.charId]);

    const updateContentData = () => {
        if (!comicId && !charId) {
            return;
        }

        clearError();

        if (comicId) {
            getComic(comicId)
                .then(onContentDataLoaded);
        } else {
            getCharacter(charId)
                .then(onContentDataLoaded);
        }
    }

    const onContentDataLoaded = (contentData) => {
        setContentData(contentData);
    }

    const backLink = `/${comicId ? `comics` : null}`;
    const errorBlock = (
        <>
            <ErrorMessage />
            <Link to={backLink} className="single-comic__back">Back to all</Link>
        </>
    );

    const errorMessage = error ? errorBlock : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !contentData) ?
        comicId ? <ComicView comic={contentData} /> :
            <CharView char={contentData} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const ComicView = ({ comic }) => {
    const { title, description, thumbnail, price, pageCount, language } = comic;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page of ${title} comic`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : 'There is no description'}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    );
}

const CharView = ({ char }) => {
    const { name, description, thumbnail } = char;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page of ${name} character`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description ? description : 'There is no description'}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </>
    );
}

export default Single;