import Spinner from "../components/spinner/Spinner";
import Skeleton from "../components/skeleton/Skeleton";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContent = (process, Component, data, newItemsLoading = false) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return newItemsLoading ? <Component data={data} /> : <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error(`Unexpected process state - ${process}`);
    }
}

export default setContent;