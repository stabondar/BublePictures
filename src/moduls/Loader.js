import gsap from 'gsap'

export default class Loader 
{
    constructor() 
    {
        const init = () => 
        {
            let loader = $('.loader')
            const hideLoader = () => { loader.css('display', 'none') }
            let tl = gsap.timeline({defaults: {duration: 0.4}, onComplete: hideLoader})

            tl.to(loader, {opacity: 0})
        }
        window.addEventListener('load', () => init())
    }
}