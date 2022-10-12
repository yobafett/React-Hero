import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';

import './single.scss';

const Single = (props) => {
    const [contentData, setContentData] = useState(null);
    const { comicId, charId } = props;
    const { process, setProcessConfirmed, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateContentData();
    }, [comicId, charId]);

    const updateContentData = () => {
        if (!comicId && !charId) {
            return;
        }

        clearError();

        if (comicId) {
            getComic(comicId)
                .then(onContentDataLoaded)
                .then(setProcessConfirmed);
        } else {
            getCharacter(charId)
                .then(onContentDataLoaded)
                .then(setProcessConfirmed);
        }
    }

    const onContentDataLoaded = (contentData) => {
        setContentData(contentData);
    }

    return (
        <>
            <AppBanner />
            {setContent(process, comicId ? ComicView : CharView, contentData)}
        </>
    )
}

const ComicView = ({ data }) => {
    const { title, description, thumbnail, price, pageCount, language } = data;

    return (
        <div className="single-comic">
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
        </div>
    );
}

const CharView = ({ data }) => {
    const { name, description, thumbnail } = data;

    return (
        <div className="single-comic">
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
        </div>
    );
}

export default Single;