import dayjs from 'dayjs'

function formatDate(
    date?: string,
    format = 'DD MMM YYYY'
) {
    if (!date) {
        return '-'
    }

    return dayjs(date).format(format)
}

export default formatDate