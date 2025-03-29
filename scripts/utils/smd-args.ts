const cmdArgs = <T>(): T =>
    process.argv.reduce((args, arg) => {
        if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            //@ts-ignore
            args[longArgFlag] = longArgValue;
        } else if (arg[0] === '-') {
            const flags = arg.slice(1).split('');
            flags.forEach((flag) => {
                //@ts-ignore
                args[flag] = true;
            });
        }

        return args;
    }, {} as T);

export default cmdArgs;
