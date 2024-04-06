import { Argv, Arguments } from 'yargs';
export declare const command = "init [dir]";
export declare const desc = "Initializes next-video in a project.";
export declare function builder(yargs: Argv): any;
export declare function handler(argv: Arguments): Promise<void>;
