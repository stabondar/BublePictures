import gsap from "gsap";

export default class Rotate
{
    constructor() 
    {   
        const init = () => 
        {
            let itemRotate = $('[icon-rotate="1"]')
            $(itemRotate).each(function()
            {
                let self = $(this)
                let inner = self.find('.svg')
                gsap.to(inner, {rotate: 360, duration: 20, ease: 'none', repeat: -1})
                let tl = gsap.timeline({ paused: true })
                tl.to(self, {rotate: -360, duration: 5, ease: 'none', repeat: -1})
                self.on('mouseenter', () => tl.play())
                self.on('mouseleave', () => tl.pause())
            })

            let itemTwoIcons = $('[two-icons="1"]')
            $(itemTwoIcons).each(function()
            {
                let self = $(this)
                let small = self.find('.elipse__small')
                gsap.set(self, {rotate: -20})
                gsap.to(self, {rotate: 20, duration: 4, ease: 'power2.inOut', repeat: -1, yoyo: true})
                gsap.to(small, {xPercent: 100, duration: 4, ease: 'power2.inOut', repeat: -1, yoyo: true})
            })
        }
        window.addEventListener('load', () => init())
    }
}