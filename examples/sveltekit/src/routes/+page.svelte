<script lang="ts">
    import mq from 'svelte-mq';
    import classnames from 'classnames';

    let styles = {
        mobile: {
            container: ['flex', 'flex-col', 'min-h-screen'],
            item: ['flex-auto'],
            red: ['bg-red-600'],
            blue: ['bg-blue-600'],
            green: ['bg-green-600'],
        },
        tablet: {
            container: ['flex', 'min-h-screen'],
            item: ['flex-auto'],
            red: ['bg-red-600'],
            blue: ['bg-blue-600'],
            green: ['bg-green-600'],
        },
        desktop: {
            container: ['grid', 'grid-cols-5', 'grid-rows-3', 'min-h-screen'],
            item: [],
            red: ['bg-red-600', 'col-start-2', 'row-start-2'],
            blue: ['bg-blue-600', 'col-start-3', 'row-start-2'],
            green: ['bg-green-600', 'col-start-4', 'row-start-2'],
        },
    };

    const style = mq({
        mobile: styles.mobile,
        tablet: styles.tablet,
        desktop: styles.desktop,
    });
</script>

<div class={classnames($style.container)}>
    <div class={classnames($style.item, $style.red)}></div>
    <div class={classnames($style.item, $style.green)}></div>
    <div class={classnames($style.item, $style.blue)}></div>
</div>
