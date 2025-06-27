<script lang="ts">
    import { matchMediaManager } from 'svelte-mq';
    import '../app.css';

    matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');
    matchMediaManager.createMatchMedia(
        'tablet',
        '(min-width: 769px) and (max-width: 1024px)',
    );
    matchMediaManager.createMatchMedia('desktop', '(min-width: 1025px)');

    let { children } = $props();
</script>

{@render children()}
