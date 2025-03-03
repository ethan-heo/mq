import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Item = styled.div`
    flex: 1 1 auto;
`;

export const RedItem = styled(Item)`
    background-color: red;
`;

export const BlueItem = styled(Item)`
    background-color: blue;
`;

export const GreenItem = styled(Item)`
    background-color: green;
`;
