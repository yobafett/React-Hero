import { useParams } from 'react-router-dom';
import Single from '../single/Single';

const SinglePage = () => {
    const { comicId, charId } = useParams();

    return (
        <Single comicId={comicId} charId={charId} />
    );
}

export default SinglePage;