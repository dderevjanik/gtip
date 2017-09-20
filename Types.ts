export type ParsedTip = Readonly<{
    /**
     * Command Name
     */
    command: string;

    /**
     * Tip Title
     */
    title: string;

    /**
     * Command that will be executed
     */
    tip: string;

    /**
     * Alternative commands
     */
    alternative?: ReadonlyArray<string>;

    /**
     * All parameters parsed from 'command'
     */
    params: ReadonlyArray<string>;
}>;