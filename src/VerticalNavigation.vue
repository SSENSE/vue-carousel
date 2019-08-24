<template>
    <div id="VueCarousel-vertical-navigation" >
        <div
        class="VueCarousel-vertical-button"
        @click="goUp"
        id="VueCarousel-nav-up">
            <slot name="VueCarousel-nav-up" >
                up
            </slot>
        </div>
        <div 
        class="VueCarousel-vertical-button"
        @click="goDown"
        id="VueCarousel-nav-down">
            <slot name="VueCarousel-nav-down" >
                down
            </slot>
        </div>
    </div>    
</template>

<script>
export default {
    methods: {
        goDown() {
            this.$emit('down');
        },
        goUp() {
            this.$emit('up');
        },
    },
};
</script>

<style>
.VueCarousel-vertical-button {
    position: absolute;
}

#VueCarousel-nav-up {
    top: 0;
}

#VueCarousel-nav-down {
    bottom: 0;
}
</style>
