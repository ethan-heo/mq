<div class="container">
    <slot />
</div>

<style>
    .container :global {
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        .item {
            flex: 1 1 auto;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: green;
        }

        .blue {
            background-color: blue;
        }
    }
</style>
