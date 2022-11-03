import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default class Text
{
    constructor() 
    {   
        let enter = 'top 80%'
        let splitLine, splitChar
        const init = () => 
        {
            // const lineAnimation = () => 
            // {
            //     let item = $('[text-line="1"]')
            //     splitLine = new SplitText(item, {type: 'lines'})
            //     $(item).each(function()
            //     {
            //         let self = $(this)
            //         let lines = self.find(splitLine.lines)
            //         let tl = gsap.timeline({paused: true, defaults: {duration: 0.8, ease: 'power3', stagger: 0.04}})
            //         tl.from(lines, {yPercent: 100, opacity: 0})
    
            //         ScrollTrigger.create({
            //             trigger: self,
            //             start: enter,
            //             onEnter: () => tl.play()
            //         })
            //     })
            // }
            // lineAnimation()
    
            const charAnimation = () => 
            {
                let item = $('[text-char="1"]')
                splitChar = new SplitText(item, {type: 'chars, lines'})
                $(item).each(function()
                {
                    let self = $(this)
                    let chars = self.find(splitChar.chars)
                    let tl = gsap.timeline({paused: true, defaults: {duration: 0.8, ease: 'power3', stagger: 0.02}})
                    tl.from(chars, {x: -20, opacity: 0})
    
                    ScrollTrigger.create({
                        trigger: self,
                        start: enter,
                        onEnter: () => tl.play()
                    })
                })
            }
            charAnimation()
        }
        
        window.addEventListener('load', () => init())

        let windowWidth = window.innerWidth

        const checkWidth = () => 
        {
            const ua = navigator.userAgent;
            let afterWidth = window.innerWidth
            if (windowWidth !== afterWidth)
            {
                // if(splitLine !== null)
                // {
                //     splitLine.revert()
                // }
    
                if(splitChar !== null)
                {
                    splitChar.revert()
                }
                init() 
            }
            windowWidth = window.innerWidth
        }

        function debounce(func) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 300, event);
        };
        }

        window.addEventListener("resize", debounce(function (e) {checkWidth()}))
        // window.addEventListener('resize', () => checkWidth())
    }
}