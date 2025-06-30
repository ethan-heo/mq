<div class="container">
    <slot />
</div>

<style>
    .container :global {
        display: grid;
        grid-template-areas:
            '. . . . .'
            '. red green blue .'
            '. . . . .';
        min-height: 100vh;

        .red {
            grid-area: red;
            background-color: red;
        }

        .green {
            grid-area: green;
            background-color: green;
        }

        .blue {
            grid-area: blue;
            background-color: blue;
        }
    }
</style>
