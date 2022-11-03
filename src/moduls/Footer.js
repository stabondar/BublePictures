import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import LocalsTime from './LocalsTime'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default class Footer 
{
    constructor() 
    {
        const timeLocal = new LocalsTime

        const init = () => 
        {
            /**
             * Time Scroll Animation
             */
            const timeScroll = () => 
            {
                let parent = $('.time')
                let line1 = parent.find('.time__line--parent').eq(0).find('.time__line')
                let line2 = parent.find('.time__line--parent').eq(1).find('.time__line')
                let tl = gsap.timeline(
                {
                    scrollTrigger: {trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 1}
                })

                tl.to(line1, {xPercent: -20})
                .to(line2, {xPercent: 20}, '<')
            }
            timeScroll()

            /**
             * Change Bg Color
             */
             const changeColor = () => 
             {
                let body = $('body')
                let nav = $('.nav')
                let navBg = nav.find('.nav__bg')
                let logo = nav.find('.nav__logo')
                let navContact = nav.find('.nav__contact').find('p')
                let triggerBlack = $('.footer')
                let path
                setTimeout(() => {
                    path = $('.nav__burger').find('path')
                }, 1000);


                let tlBlack = gsap.timeline(
                {
                    scrollTrigger: {trigger: triggerBlack, start: 'top 90%', end: 'top 90%', scrub: 1}
                })

                setTimeout(() => {
                    tlBlack.to(body, {backgroundColor: '#0B1219', color: '#FFFFFF'})
                    .to(navBg, {backgroundColor: 'rgba(11, 18, 25, 0.8)'}, '<')
                    .to(path, {fill: 'white'}, '<')
                    .to(logo, {filter: 'invert(100%) grayscale(100%)'}, '<')
                    .to(navContact, {color: '#FFFFFF'}, '<')
                }, 1000);
             }
             changeColor()
        }
        window.addEventListener('load', () => init())
    }
}