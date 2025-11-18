import { ref, onMounted } from 'vue';
const translateIndexLevel = (level) => {
    if (!level)
        return "indisponible";
    const map = {
        "good": "Bon",
        "moderate": "Modéré",
        "unhealthy-sensitive": "Dégradé",
        "unhealthy": "Mauvais",
        "very-unhealthy": "Très mauvais",
        "hazardous": "Dangereux"
    };
    return map[level] ?? level;
};
const loading = ref(true);
const airData = ref({
    temperature: null,
    humidity: null,
    pressure: null,
    pm25: null,
    pm10: null,
    o3: null,
    no2: null,
    index: null,
    indexLevel: null
});
const fetchAirQuality = async () => {
    try {
        loading.value = true;
        const response = await fetch('https://api.waqi.info/feed/rennes/?token=65f9c9e6ade05413509068cf513e9787ee6e6b97');
        const data = await response.json();
        if (data.data) {
            const iaqi = data.data.iaqi;
            airData.value = {
                temperature: iaqi.t?.v ?? null,
                humidity: iaqi.h?.v ?? null,
                pressure: iaqi.p?.v ?? null,
                pm25: iaqi.pm25?.v ?? null,
                pm10: iaqi.pm10?.v ?? null,
                o3: iaqi.o3?.v ?? null,
                no2: iaqi.no2?.v ?? null,
                index: data.data.aqi ?? null,
                indexLevel: data.data.aqi ? getIndexLevel(data.data.aqi) : null
            };
        }
    }
    catch (error) {
        console.error('Erreur chargement air:', error);
    }
    finally {
        loading.value = false;
    }
};
const getIndexLevel = (index) => {
    if (index <= 50)
        return 'good';
    if (index <= 100)
        return 'moderate';
    if (index <= 150)
        return 'unhealthy-sensitive';
    if (index <= 200)
        return 'unhealthy';
    if (index <= 300)
        return 'very-unhealthy';
    return 'hazardous';
};
onMounted(() => {
    fetchAirQuality();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['index-good']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['index-unhealthy']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['index-very-unhealthy']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['index-hazardous']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['data-row']} */ ;
/** @type {__VLS_StyleScopedClasses['particule-row']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['air-quality-section']} */ ;
/** @type {__VLS_StyleScopedClasses['main-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "air-quality-section" },
    id: "air-quality",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "main-card" },
    ...{ class: ({ 'skeleton': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "aqi-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
(__VLS_ctx.loading ? '' : 'Indice global');
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "aqi-circle" },
    ...{ class: ([
            __VLS_ctx.loading ? 'skeleton-circle' : (__VLS_ctx.airData.indexLevel ? `index-${__VLS_ctx.airData.indexLevel}` : '')
        ]) },
});
// @ts-ignore
[loading, airData, airData,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "aqi-value" },
    });
    (__VLS_ctx.airData.index !== null ? __VLS_ctx.airData.index : 'N/A');
    // @ts-ignore
    [airData, airData,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "aqi-status" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
(__VLS_ctx.loading ? '' : __VLS_ctx.translateIndexLevel(__VLS_ctx.airData.indexLevel));
// @ts-ignore
[loading, airData, translateIndexLevel,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "quality-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
    ...{ class: ({ 'skeleton': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "card-title" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "particule-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.pm25 !== null ? __VLS_ctx.airData.pm25 : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "particule-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.pm10 !== null ? __VLS_ctx.airData.pm10 : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "particule-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.o3 !== null ? __VLS_ctx.airData.o3 : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "particule-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.no2 !== null ? __VLS_ctx.airData.no2 : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
    ...{ class: ({ 'skeleton': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "card-title" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.temperature !== null ? __VLS_ctx.airData.temperature : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.humidity !== null ? __VLS_ctx.airData.humidity : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "data-row" },
    ...{ class: ({ 'skeleton-row': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-label" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-tooltip" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tooltip-text" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "data-value" },
    ...{ class: ({ 'skeleton-text': __VLS_ctx.loading }) },
});
// @ts-ignore
[loading,];
if (!__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    (__VLS_ctx.airData.pressure !== null ? __VLS_ctx.airData.pressure : 'N/A');
    // @ts-ignore
    [airData, airData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "data-unit" },
    });
}
/** @type {__VLS_StyleScopedClasses['air-quality-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-card']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['aqi-status']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['particule-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['particule-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['particule-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['particule-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['data-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['data-row']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-row']} */ ;
/** @type {__VLS_StyleScopedClasses['data-label']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-value']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-text']} */ ;
/** @type {__VLS_StyleScopedClasses['data-unit']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
