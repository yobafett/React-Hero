import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charSearch.scss';

const CharSearch = () => {
    const { findCharacter, process, setProcessConfirmed } = useMarvelService();
    const [charList, setCharList] = useState([]);

    useEffect(() => {
        setProcessConfirmed();
    }, []);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'This field is required';
        }

        return errors;
    }

    return (
        <div className='char-search'>
            <Formik
                initialValues={{
                    name: '',
                }}
                validate={validate}
                onSubmit={(values) => {
                    findCharacter(values.name)
                        .then(res => setCharList(res))
                        .then(setProcessConfirmed);
                }}>
                <Form className="form">
                    <label htmlFor="name">Or find a character by name:</label>
                    <div className='wrapper'>
                        <Field id="name" name="name" />
                        <button type="submit" className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                    </div>
                    <ErrorMessage className="error" name="name" component='div' />
                </Form>
            </Formik>
            <ul className='search-result'>
                {setContent(process, SearchResults, charList)}
            </ul>
        </div>
    )
}

const SearchResults = ({ data }) => {
    if (data.length > 1) {
        return data.map(item => {
            return (
                <Link to={`/char/${item.id}`} key={item.id}>
                    <li>
                        {item.name}
                    </li>
                </Link>
            )
        });
    } else {
        // return (
        //     <>The character was not found. Check the name and try again.</>
        // )
    }
}

export default CharSearch;