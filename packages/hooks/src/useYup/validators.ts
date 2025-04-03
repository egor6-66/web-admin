function ipv4(message = 'невалидное имя хоста') {
    return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
        message,
        excludeEmptyString: true,
    }).test('ip', message, (value: any) => {
        return value === undefined || value.trim() === '' ? true : value.split('.').find((i: any) => parseInt(i, 10) > 255) === undefined;
    });
}

const validators = {
    ipv4,
};

export default validators;
