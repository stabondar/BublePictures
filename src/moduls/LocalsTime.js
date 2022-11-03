export default class LocalsTime 
{
    constructor() 
    {
        let toExactMinute = 60000 - (new Date().getTime() % 60000)
        let date = new Date()

        // Amsterdam
        let optionsAmsterdam = {hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Amsterdam'}
        let timeAmsterdam = $('.time').find('.is--amsterdam').find('.p--32')
        // London
        let optionsLondon = {hour: 'numeric', minute: 'numeric', timeZone: 'Europe/London'}
        let timeLondon = $('.time').find('.is--london').find('.p--32')

        // Florence
        let optionsFlorence = {hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Rome'}
        let timeFlorence = $('.time').find('.is--florence').find('.p--32')

        // New York
        let optionsNewYork = {hour: 'numeric', minute: 'numeric', timeZone: 'America/New_York'}
        let timeNewYork = $('.time').find('.is--new-york').find('.p--32')

        // Mexico
        let optionsMexico = {hour: 'numeric', minute: 'numeric', timeZone: 'America/Mexico_City'}
        let timeMexico = $('.time').find('.is--mexico').find('.p--32')

        const updateTime = () => 
        {
            timeAmsterdam.text(new Intl.DateTimeFormat('en-GB', optionsAmsterdam).format(date))
            timeLondon.text(new Intl.DateTimeFormat('en-GB', optionsLondon).format(date))
            timeFlorence.text(new Intl.DateTimeFormat('en-GB', optionsFlorence).format(date))
            timeNewYork.text(new Intl.DateTimeFormat('en-GB', optionsNewYork).format(date))
            timeMexico.text(new Intl.DateTimeFormat('en-GB', optionsMexico).format(date))
        }
        updateTime()

        setInterval(() => 
        {
            date = new Date()
            updateTime()
        }, toExactMinute)
    }
}