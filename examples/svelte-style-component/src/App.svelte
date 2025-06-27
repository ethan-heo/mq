<script lang="ts">
    import Mobile from './Mobile.svelte';
    import Tablet from './Tablet.svelte';
    import Desktop from './Desktop.svelte';
    import mq from 'svelte-mq';

    const Style = mq({
        mobile: Mobile,
        tablet: Tablet,
        desktop: Desktop,
    });

    console.log(Style);
</script>

<svelte:component this={$Style}>
    <div class={`item red`}></div>
    <div class={`item green`}></div>
    <div class={`item blue`}></div>
</svelte:component>
