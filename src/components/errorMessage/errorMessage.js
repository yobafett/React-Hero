import errorGif from './error.gif';

const ErrorMessage = () => {
    const style = {
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
    }

    return (
        <img style={style} src={errorGif} alt={'error'} />
    );
}

export default ErrorMessage;