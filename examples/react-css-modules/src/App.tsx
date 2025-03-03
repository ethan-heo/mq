import useMediaQuery from '@mq/react';
import mobile from './mobile.module.css';
import tablet from './tablet.module.css';
import desktop from './desktop.module.css';

function App() {
    const module = useMediaQuery({
        mobile,
        tablet,
        desktop,
    });

    return (
        <div className={module.container}>
            <div className={`${module.item} ${module.red}`}></div>
            <div className={`${module.item} ${module.green}`}></div>
            <div className={`${module.item} ${module.blue}`}></div>
        </div>
    );
}

export default App;
