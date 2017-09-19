declare module 'vorpal' {

    type VorpalAction = (arg: any, callback: any) => void;

    interface Vorpal {
        readonly command: (commandName: string, description?: string) => Vorpal;
        readonly autocomplete: (items: string[]) => Vorpal;
        readonly option: (name: string) => void;
        readonly action: (callback: VorpalAction) => void;
        readonly delimiter: (delimiter: string) => Vorpal;
        readonly show: () => void;
    }

    const vorpal: () => Vorpal;
    export = vorpal;
}
