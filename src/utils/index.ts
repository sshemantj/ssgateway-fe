const setSplit = (value1: string, value2: string) => {
    const splitby = "%*-)";
    return `${value1}${splitby}${value2}`;
};
const getSplit = (value: string) => {
    const splitby = "%*-)";
    const [value1, value2] = value.split(splitby);
    return {
        value1,
        value2,
    };
};

export { getSplit, setSplit }