import { ref, watch, defineProps, defineEmits, nextTick, onUnmounted } from 'vue';
import L from 'leaflet';
const props = defineProps();
const emit = defineEmits(['close']);
const mapElement = ref(null);
const selectedItem = ref(null);
let mapInstance = null;
const closeModal = () => {
    // clear selection when closing
    selectedItem.value = null;
    emit('close');
};
const initializeMap = () => {
    if (!mapElement.value)
        return;
    if (mapInstance) {
        mapInstance.remove();
    }
    mapInstance = L.map(mapElement.value).setView([48.1173, -1.6778], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(mapInstance);
    // Add markers for items if provided
    if (props.items && Array.isArray(props.items)) {
        props.items.forEach((item) => {
            if (typeof item.lat === 'number' && typeof item.lon === 'number') {
                L.marker([item.lat, item.lon])
                    .bindPopup(`<strong>${item.name ?? ''}</strong>`)
                    .addTo(mapInstance)
                    .on('click', () => {
                    selectedItem.value = item;
                });
            }
        });
    }
};
// Initialize map when modal opens. Use nextTick to ensure DOM is ready.
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        nextTick(() => initializeMap());
    }
});
onUnmounted(() => {
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
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
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['item-details']} */ ;
/** @type {__VLS_StyleScopedClasses['item-details']} */ ;
if (__VLS_ctx.isOpen) {
    // @ts-ignore
    [isOpen,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeModal) },
        ...{ class: "modal-overlay" },
    });
    // @ts-ignore
    [closeModal,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "modal-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "modal-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.title);
    // @ts-ignore
    [title,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeModal) },
        ...{ class: "close-btn" },
    });
    // @ts-ignore
    [closeModal,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "map-container" },
        ref: "mapElement",
    });
    /** @type {typeof __VLS_ctx.mapElement} */ ;
    // @ts-ignore
    [mapElement,];
    if (__VLS_ctx.selectedItem) {
        // @ts-ignore
        [selectedItem,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "item-details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (__VLS_ctx.selectedItem.name);
        // @ts-ignore
        [selectedItem,];
        if (__VLS_ctx.selectedItem.hours) {
            // @ts-ignore
            [selectedItem,];
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            (__VLS_ctx.selectedItem.hours);
            // @ts-ignore
            [selectedItem,];
        }
        if (__VLS_ctx.selectedItem.available) {
            // @ts-ignore
            [selectedItem,];
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            (__VLS_ctx.selectedItem.available);
            // @ts-ignore
            [selectedItem,];
        }
    }
}
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['map-container']} */ ;
/** @type {__VLS_StyleScopedClasses['item-details']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
