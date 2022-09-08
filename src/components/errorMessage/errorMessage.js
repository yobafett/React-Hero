import errorGif from './error.gif';

const ErrorMessage = () => {
    const style = {
        display: 'block',
        height: '250px',
        margin: '0 auto',
    }

    return (
        <img style={style} src={errorGif} alt={'error'} />
    );
}

export default ErrorMessage;