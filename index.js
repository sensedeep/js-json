/*
    js-json - Json Encoding
 */

export class Json {

    /*
        Reviver for JSON.parse(, reviver) 
     */
    static decode(key, value) {
        if (typeof value == 'string') {
            if (value.indexOf('{type:date}') == 0) {
                return new Date(value.slice(11))
            } else if (value.indexOf('{type:regexp}') == 0) {
                return new Regexp(value.slice(13))
            }
        }
        return value
    }

    /*
        Prepare an object for encoding by JSON.stringify()
     */
    static encode(obj, nest = 0) {
        if (obj) {
            for (let [key,value] of Object.entries(obj)) {
                if (value instanceof Date) {
                    obj[key] = '{type:date}' + value.toUTCString()
                } else if (value instanceof RegExp) {
                    obj[key] = '{type:regexp}' + value.source
                } else if (typeof value == 'object') {
                    if (nest < 20) {
                        Json.encode(value, ++nest)
                    }
                }
            }
        }
        return obj
    }
}
