import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

export default class Link {
    constructor() {
        const init = () => 
        {
            const buttons = () => 
            {
                let item = $('.btn')
                $(item).each(function()
                {
                    let self = $(this)
                    let parent = self.parent()
                    let text = self.find('p')
                    let split = new SplitText(text, {type: 'chars'})
                    let leftLine = self.find('.btn__line.is--left')
                    let bottomLine = self.find('.btn__line--bot')
                    let tl = gsap.timeline(
                    {
                        paused: true, defaults: {duration: 0.4, ease: 'power3'}
                    })

                    gsap.set(bottomLine, {clipPath: 'inset(0 0 0 0%)'})
                    tl.to(leftLine, {transformOrigin: 'bottom', scaleY: '0', duration: 0.4})
                    .to(bottomLine, {clipPath: 'inset(0 0 0 100%)'}, '<50%')
                    .to(leftLine, {transformOrigin: 'top', scaleY: '1', duration: 0.4}, '>')
                    .to(bottomLine, {clipPath: 'inset(0 100% 0 0%)', duration: 0, ease: 'none'}, '<')
                    .to(bottomLine, {clipPath: 'inset(0 0% 0 0%)'}, '>0.2')
                    .to(split.chars, {opacity: 0, stagger: 0.1, duration: 0.2}, 0)
                    .to(split.chars, {opacity: 1, stagger: 0.1, duration: 0.2}, 0.2)

                    self.on('mouseenter', () => tl.restart())

                    if(parent.hasClass('form__btn'))
                    {
                        parent.on('mouseenter', () => tl.restart())
                    }
                })
            }
            buttons()

            const textLinks = () => 
            {
                let item = $('a.copy__item, a.nav__contact')
                $(item).each(function()
                {
                    let self = $(this)
                    let textOut = self.find('p')
                    let innerTextOut = textOut.text()
                    let textOutClasses = textOut.attr('class')
                    self.append(`<div class="${textOutClasses} captain"></div>`)
                    let textIn = self.find('.captain')
                    textIn.text(innerTextOut)
                    gsap.set(textIn, {position: 'absolute', top: '100%', left: 0, letterSpacing: '-0.01em', width: '100%'})
                    gsap.set(self, {position: 'relative', overflow: 'hidden'})
                    function fnBrowserDetect(){
                 
                        let userAgent = navigator.userAgent;
                        
                        if(userAgent.match(/safari/i))
                        {
                            gsap.set(self, {paddingRight: '0.3vw'})     
                        }       
                    }
                    fnBrowserDetect()
                    let splitOut = new SplitText(textOut, {type: 'chars'})
                    let splitIn = new SplitText(textIn, {type: 'chars'})
                    let tl = gsap.timeline(
                    {
                        paused: true, defaults: {duration: 0.8, ease: 'power2', stagger: 0.03}
                    })

                    tl.to(splitOut.chars, {yPercent: -100})
                    .to(splitIn.chars, {yPercent: -100}, '<')

                    self.on('mouseenter', () => tl.restart())
                    self.on('mouseleave', () => tl.reverse())
                })
            }
            textLinks()

            const emailLink = () => 
            {
                let item = $('.footer__right').find('.col--pink')
                $(item).each(function()
                {
                    let self = $(this)
                    let split = new SplitText(self, {type: 'chars'})
                    let tl = gsap.timeline(
                    {
                        paused: true, defaults: {duration: 0.4, ease: 'power3'}
                    })

                    tl.to(split.chars, {opacity: 0, stagger: 0.02, duration: 0.06})
                    .to(split.chars, {opacity: 1, stagger: 0.02, duration: 0.06}, 0.1)

                    self.on('mouseenter', () => tl.restart())
                })
            }
            emailLink()
        }
        window.addEventListener('load', () => init())
    }
}
