
export function toSelectItems(collection) {
    return collection ? collection.map((x) => { return toSelectItem(x) }) : [];
}
export function toSelectItem(objIdName) {
    const newKeys = { id: "value", name: "label" };
    return renameKeys(objIdName, newKeys);
}

export function toIdNameObjects(collection) {
    return collection ? collection.map((x) => { return toIdNameObject(x) }) : [];
}
export function toIdNameObject(selectItem) {
    const newKeys = { value: "id", label: "name" };
    return renameKeys(selectItem, newKeys);
}

export function renameKeys(obj, newKeys) {
    if (!obj) return;

    const keyValues = Object.keys(obj).map(key => {
        if (!newKeys.hasOwnProperty(key)) return { [key]: obj[key] }
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

export function toFormData(obj) {
    var formdata = new FormData();

    for (let key in obj) {
        if (obj[key] instanceof Array || obj[key] instanceof FileList)
            Array.from(obj[key]).forEach(item => formdata.append(key, item));
        else
            formdata.append(key, JSON.stringify(obj[key]));
    }

    return formdata;
}