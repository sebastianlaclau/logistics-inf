export const longFormatDate = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    });

export const shortFormatDate = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

export const shortFormatDateAndTime = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

export const setAsTitleCase = (str) => {
    return str
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
};

