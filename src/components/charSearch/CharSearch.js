import './charSearch.scss';

const CharSearch = (props) => {


    return (
        <div className="char-search">
            <span>Or find a character by name:</span>
            <input type="text" />
            <button className="button button__main">
                <div className="inner">try it</div>
            </button>
            <span className='info'>This field is required</span>
            <button className="button button__main">
                <div className="inner">to page</div>
            </button>
        </div>
    )
}

export default CharSearch;