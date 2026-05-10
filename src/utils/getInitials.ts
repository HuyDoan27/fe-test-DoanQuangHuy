export default function getInitials(
    name?: string
) {
    if (!name) return 'UN'

    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}