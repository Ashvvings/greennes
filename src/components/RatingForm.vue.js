import { reactive, ref } from 'vue';
const form = reactive({
    infrastructureType: '',
    location: '',
    rating: 0
});
const hoverRating = ref(0);
const submitRating = () => {
    errors.infrastructureType = '';
    errors.location = '';
    errors.rating = '';
    let hasError = false;
    if (!form.infrastructureType) {
        errors.infrastructureType = 'Veuillez sélectionner un type de lieu.';
        hasError = true;
    }
    if (!form.location) {
        errors.location = 'Veuillez saisir le nom du lieu.';
        hasError = true;
    }
    if (!form.rating) {
        errors.rating = 'Veuillez attribuer une note au lieu.';
        hasError = true;
    }
    if (hasError)
        return;
    console.log('Rating submitted:', form);
    alert('Merci pour votre avis !');
    form.infrastructureType = '';
    form.location = '';
    form.rating = 0;
    hoverRating.value = 0;
};
const errors = reactive({
    infrastructureType: '',
    location: '',
    rating: ''
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['rating-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-form']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "rating-section" },
    id: "comment",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "form-intro" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.submitRating) },
    ...{ class: "rating-form" },
});
// @ts-ignore
[submitRating,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "infrastructure-type",
});
__VLS_asFunctionalElement(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    id: "infrastructure-type",
    value: (__VLS_ctx.form.infrastructureType),
    ...{ class: "form-input" },
});
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "",
    disabled: true,
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "Parc",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "Station de vélo",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "Poubelles de déchets alimentaires",
});
if (__VLS_ctx.errors.infrastructureType) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.infrastructureType);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "location",
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    id: "location",
    value: (__VLS_ctx.form.location),
    type: "text",
    placeholder: "Nom du lieu",
    ...{ class: "form-input" },
});
// @ts-ignore
[form,];
if (__VLS_ctx.errors.location) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.location);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "rating",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rating-stars" },
});
for (const [star] of __VLS_getVForSourceType((5))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.form.rating = star;
                // @ts-ignore
                [form,];
            } },
        ...{ onMouseover: (...[$event]) => {
                __VLS_ctx.hoverRating = star;
                // @ts-ignore
                [hoverRating,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                __VLS_ctx.hoverRating = 0;
                // @ts-ignore
                [hoverRating,];
            } },
        key: (star),
        type: "button",
        ...{ class: (['star', { filled: star <= (__VLS_ctx.hoverRating || __VLS_ctx.form.rating) }]) },
    });
    // @ts-ignore
    [form, hoverRating,];
}
if (__VLS_ctx.errors.rating) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.rating);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    ...{ class: "submit-btn" },
});
/** @type {__VLS_StyleScopedClasses['rating-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-stars']} */ ;
/** @type {__VLS_StyleScopedClasses['filled']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
