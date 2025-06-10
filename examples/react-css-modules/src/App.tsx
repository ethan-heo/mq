import useMediaQuery from 'react-mq-hook';
import mobile from './mobile.module.css';
import tablet from './tablet.module.css';
import desktop from './desktop.module.css';

function App() {
    const { module } = useMediaQuery({
        mobile,
        tablet,
        desktop,
    });

    return (
        <>
            <div className={module.container}>
                <div className={`${module.item} ${module.red}`}></div>
                <div className={`${module.item} ${module.green}`}></div>
                <div className={`${module.item} ${module.blue}`}></div>
            </div>
            <Test1 />
        </>
    );
}

export default App;

function Test1() {
    const { module } = useMediaQuery({
        mobile: desktop,
        tablet,
        desktop: mobile,
    });

    return (
        <div className={module.container}>
            <div className={`${module.item} ${module.red}`}></div>
            <div className={`${module.item} ${module.green}`}></div>
            <div className={`${module.item} ${module.blue}`}></div>
        </div>
    );
}
