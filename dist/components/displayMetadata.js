"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displaymetadata(logger) {
    return function displayMetadata(props, onPropsUpdate) {
        const layout = props.layout;
        const metaItems = [];
        const data = props.data.map(metaItem => {
            metaItem = { ...metaItem };
            const initialItem = {
                label: metaItem.label,
            };
            // Currently doing all of this repetitive work separately to leverage
            // static type checking, but could be done more dynamically in a loop as well
            if ('value' in metaItem && metaItem.value !== undefined) {
                if (typeof metaItem.value === 'function') {
                    metaItem.value = metaItem.value();
                }
                if (!(metaItem.value instanceof Promise)) {
                    initialItem.value = metaItem.value;
                }
                else {
                    initialItem.value = undefined;
                }
            }
            if ('url' in metaItem && metaItem.url !== undefined) {
                if (typeof metaItem.url === 'function') {
                    metaItem.url = metaItem.url();
                }
                if (!(metaItem.url instanceof Promise)) {
                    initialItem.url = metaItem.url;
                }
                else {
                    initialItem.url = undefined;
                }
            }
            if ('image' in metaItem && metaItem.image !== undefined) {
                if (typeof metaItem.image === 'function') {
                    metaItem.image = metaItem.image();
                }
                if (!(metaItem.image instanceof Promise)) {
                    initialItem.image = metaItem.image;
                }
                else {
                    initialItem.image = undefined;
                }
            }
            if ('route' in metaItem && metaItem.route !== undefined) {
                if (typeof metaItem.route === 'function') {
                    metaItem.route = metaItem.route();
                }
                if (!(metaItem.route instanceof Promise)) {
                    initialItem.route = metaItem.route;
                }
                else {
                    initialItem.route = undefined;
                }
            }
            if ('action' in metaItem && metaItem.action !== undefined) {
                if (typeof metaItem.action === 'function') {
                    metaItem.action = metaItem.action();
                }
                if (!(metaItem.action instanceof Promise)) {
                    initialItem.action = metaItem.action;
                }
                else {
                    initialItem.action = undefined;
                }
            }
            if ('params' in metaItem && metaItem.params !== undefined) {
                if (typeof metaItem.params === 'function') {
                    metaItem.params = metaItem.params();
                }
                if (!(metaItem.params instanceof Promise)) {
                    initialItem.params = metaItem.params;
                }
                else {
                    initialItem.params = undefined;
                }
            }
            metaItems.push(metaItem);
            return initialItem;
        });
        if (onPropsUpdate) {
            for (let i = 0; i < metaItems.length; i++) {
                const metaItem = metaItems[i];
                if ('value' in metaItem) {
                    if (metaItem.value instanceof Promise) {
                        metaItem.value
                            .then(resolvedValue => {
                            data[i].value = resolvedValue;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "value" with result from Promise:', err);
                        });
                    }
                }
                if ('url' in metaItem) {
                    if (metaItem.url instanceof Promise) {
                        metaItem.url
                            .then(resolvedurl => {
                            data[i].url = resolvedurl;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "url" with result from Promise:', err);
                        });
                    }
                }
                if ('image' in metaItem) {
                    if (metaItem.image instanceof Promise) {
                        metaItem.image
                            .then(resolvedimage => {
                            data[i].image = resolvedimage;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "image" with result from Promise:', err);
                        });
                    }
                }
                if ('route' in metaItem) {
                    if (metaItem.route instanceof Promise) {
                        metaItem.route
                            .then(resolvedroute => {
                            data[i].route = resolvedroute;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "route" with result from Promise:', err);
                        });
                    }
                }
                if ('action' in metaItem) {
                    if (metaItem.action instanceof Promise) {
                        metaItem.action
                            .then(resolvedaction => {
                            data[i].action = resolvedaction;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "action" with result from Promise:', err);
                        });
                    }
                }
                if ('params' in metaItem) {
                    if (metaItem.params instanceof Promise) {
                        metaItem.params
                            .then(resolvedparams => {
                            data[i].params = resolvedparams;
                            onPropsUpdate === null || onPropsUpdate === void 0 ? void 0 : onPropsUpdate.post({
                                layout,
                                data,
                            });
                        })
                            .catch(err => {
                            logger.error('Error updating metadata field "params" with result from Promise:', err);
                        });
                    }
                }
            }
        }
        return {
            props: {
                data,
                layout,
            },
        };
    };
}
exports.default = displaymetadata;
