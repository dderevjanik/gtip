type VorpalAction = (arg: any, callback: any) => void;

declare interface Vorpal {
    readonly command: (commandName: string, description?: string) => Vorpal;
    readonly autocomplete: (items: string[]) => Vorpal;
    readonly option: (name: string, description: string) => Vorpal;
    readonly action: (callback: VorpalAction) => void;
    readonly delimiter: (delimiter: string) => Vorpal;
    readonly show: () => void;
}

declare const MAME: { x: number };

declare module 'vorpal' {
    const vorpal: () => Vorpal;
    export = vorpal;
}

declare module 'fuzzysearch' {
    const fuzzysearch: (searchValue: string, againstString: string) => boolean;
    export = fuzzysearch;
}
