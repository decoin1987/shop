export default function(num) {
    return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(
        num,
    )
}



