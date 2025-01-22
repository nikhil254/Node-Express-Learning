export function createKeyMap<T extends Record<string, any>>(definitions: T): Record<keyof T, keyof T> {
    return Object.keys(definitions).reduce((acc, key) => {
        acc[key as keyof T] = key as keyof T;
        return acc;
    }, {} as Record<keyof T, keyof T>);
}