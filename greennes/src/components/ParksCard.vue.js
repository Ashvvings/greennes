import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { calculateDistance, formatDistance } from '../utils/geoLocation';
const props = defineProps({
    location: String,
    userLat: Number,
    userLon: Number
});
const emit = defineEmits(['show-map']);
const currentSlide = ref(0);
const parks = ref([
    {
        name: 'Étang des Longs Champs',
        distance: '200m',
        image: '/placeholder.svg?height=200&width=300',
        lat: 48.1245,
        lon: -1.6890
    },
    {
        name: 'Parc des Gayeulles',
        distance: '500m',
        image: '/placeholder.svg?height=200&width=300',
        lat: 48.1156,
        lon: -1.6834
    },
    {
        name: 'Parc de la Préfecture',
        distance: '450m',
        image: '/placeholder.svg?height=200&width=300',
        lat: 48.1102,
        lon: -1.6745
    }
]);
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % parks.value.length;
};
const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + parks.value.length) % parks.value.length;
};
watch(() => [props.userLat, props.userLon], () => {
    if (props.userLat && props.userLon) {
        parks.value = parks.value.map(park => ({
            ...park,
            formattedDistance: park.lat && park.lon
                ? formatDistance(calculateDistance(props.userLat, props.userLon, park.lat, park.lon))
                : park.distance
        }));
    }
}, { immediate: true });
onMounted(() => {
    // Load parks data from API if needed
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-container']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-container']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "category-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
    fill: "currentColor",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "carousel-wrapper" },
});
if (__VLS_ctx.parks.length > 1) {
    // @ts-ignore
    [parks,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.prevSlide) },
        ...{ class: "carousel-btn prev" },
    });
    // @ts-ignore
    [prevSlide,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "carousel-container" },
});
if (__VLS_ctx.parks[__VLS_ctx.currentSlide]) {
    // @ts-ignore
    [parks, currentSlide,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "carousel-slide" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.parks[__VLS_ctx.currentSlide].image),
        alt: (__VLS_ctx.parks[__VLS_ctx.currentSlide].name),
    });
    // @ts-ignore
    [parks, parks, currentSlide, currentSlide,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "slide-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
    (__VLS_ctx.parks[__VLS_ctx.currentSlide].name);
    // @ts-ignore
    [parks, currentSlide,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.parks[__VLS_ctx.currentSlide].formattedDistance || __VLS_ctx.parks[__VLS_ctx.currentSlide].distance);
    // @ts-ignore
    [parks, parks, currentSlide, currentSlide,];
}
if (__VLS_ctx.parks.length > 1) {
    // @ts-ignore
    [parks,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.nextSlide) },
        ...{ class: "carousel-btn next" },
    });
    // @ts-ignore
    [nextSlide,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('show-map');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "btn-more" },
});
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['prev']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-container']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide-info']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['next']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    props: {
        location: String,
        userLat: Number,
        userLon: Number
    },
});
export default {};
