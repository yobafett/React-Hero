import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearch.scss';

const CharSearch = () => {
    const { findCharacter, loading } = useMarvelService();

    const [charList, setCharList] = useState(null);
    const [selectedChar, setSelectedChar] = useState(null);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'This field is required';
        }

        return errors;
    }


    const SearchResults = ({ charList }) => {
        if (charList.length > 1) {
            return charList.map(item => {
                return (
                    <Link to={`/char/${item.id}`}>
                        <li onClick={() => setSelectedChar(item)} key={item.id}>
                            {item.name}
                        </li>
                    </Link>
                )
            });
        } else {
            return (
                <>The character was not found. Check the name and try again.</>
            )
        }
    }

    const searchResults = charList ? <SearchResults charList={charList} /> : null;

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
                }}>
                <Form className="form">
                    <label htmlFor="name">Or find a character by name:</label>
                    <div className='wrapper'>
                        <Field id="name" name="name" />
                        <button type="submit" className="button button__main" disabled={loading}>
                            <div className="inner">try it</div>
                        </button>
                    </div>
                    <ErrorMessage className="error" name="name" component='div'/>
                </Form>
            </Formik>
            <ul className='search-result'>{searchResults}</ul>
        </div>
    )
}

export default CharSearch;