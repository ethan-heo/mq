import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        '. . . . .'
        '. red green blue .'
        '. . . . .';
    min-height: 100vh;
`;

export const RedItem = styled.div`
    grid-area: red;
    background-color: red;
`;

export const BlueItem = styled.div`
    grid-area: blue;
    background-color: blue;
`;

export const GreenItem = styled.div`
    grid-area: green;
    background-color: green;
`;
