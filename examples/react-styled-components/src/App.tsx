import useMediaQuery from 'react-mq-hook';
import * as mobile from './mobile.styled';
import * as tablet from './tablet.styled';
import * as desktop from './desktop.styled';

function App() {
    const { module: Styled } = useMediaQuery({
        mobile,
        tablet,
        desktop,
    });

    return (
        <Styled.Container>
            <Styled.RedItem />
            <Styled.GreenItem />
            <Styled.BlueItem />
        </Styled.Container>
    );
}

export default App;
