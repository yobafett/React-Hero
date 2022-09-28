import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = (props) => {
    const [comic, setComic] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [props.comicId]);

    const updateComic = () => {
        const { comicId } = props;
        if (!comicId) {
            return;
        }

        clearError();

        getComic(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorBlock = (
        <>
            <ErrorMessage />
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    );

    const errorMessage = error ? errorBlock : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ comic }) => {
    const { title, description, thumbnail, price, pageCount, language } = comic;

    return (
        <>
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

export default SingleComic;