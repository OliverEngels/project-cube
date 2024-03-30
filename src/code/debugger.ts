export class Debugger {
    static isDebugOn: boolean = false;

    static log(...messages: any[]) {
        if (Debugger.isDebugOn) {
            const e = new Error();
            const stack = e.stack?.toString().split("\n");
            const callerLine = stack ? stack[3] : '';

            console.log(...messages, `\n\tat ${callerLine.trim().slice(3).replace('webpack-internal:///', '')}`);
        }
    }

    static error(...messages: any[]) {
        if (Debugger.isDebugOn) {
            const e = new Error();
            const stack = e.stack?.toString().split("\n");
            const callerLine = stack ? stack[3] : '';

            console.error(...messages, `\n\tat ${callerLine.trim().slice(3).replace('webpack-internal:///', '')}`);
        }
    }
}