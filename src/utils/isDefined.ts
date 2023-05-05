export function isDefined<T>(val: T): asserts val is NonNullable<T>{
    if(!val){
        throw Error("Val cannot be null")
    }
}