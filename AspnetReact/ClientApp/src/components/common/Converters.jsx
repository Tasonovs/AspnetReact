
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

// https://stackoverflow.com/a/12475270
export function toTimeHasPassed(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        // [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        // [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    ];
    let max_seconds = time_formats[time_formats.length - 1][0];
    var seconds = (+new Date() - time) / 1000, token = 'ago', list_choice = 1;

    if (seconds >= max_seconds) return new Date(time).toLocaleDateString();

    if (seconds === 0) return 'Just now'

    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }

    var i = 0, format;
    while (true) {
        format = time_formats[i++]
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    }
}
