import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'

export default class LocoGsap 
{
    constructor()
    {
        /**
         * Setup Loco And Gsap
         */
        gsap.registerPlugin(ScrollTrigger)
        
        let locoScroll
        if (window.innerWidth > 480) 
        {
            locoScroll = new LocomotiveScroll({
                el: document.querySelector('.loco-wrapper'),
                smooth: true,
                multiplier: 1.2,
                lerp: 0.06
            });
            locoScroll.on('scroll', ScrollTrigger.update);
            ScrollTrigger.scrollerProxy('.loco-wrapper', {
                scrollTop(value) {
                    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                },
                pinType: document.querySelector('.loco-wrapper').style.transform ? 'transform' : 'fixed'
            });
        }
        ScrollTrigger.defaults({
            scroller: '.loco-wrapper'
        })
        
        const init = () => 
        {
            /**
             * GSAP no blick
             */
            gsap.set('main', { autoAlpha: 1 })
        
        }
        
        window.addEventListener('load', () => 
        {
            init()
            ScrollTrigger.addEventListener('refresh', () => locoScroll.update())
            locoScroll.update()
        })
        
        
        $(window).on('resize', function (e) {
            ScrollTrigger.refresh()
            locoScroll.update();
        });

        

        barba.init(
        {
            transitions: [
            {
                name: 'opacity-transition',
                leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0
                })
                },
                enter(data) 
                {
                    return (
                        gsap.from(data.next.container, {
                            opacity: 0
                        }),
                        gsap.set('main', { autoAlpha: 1 })
                        // locoScroll.update()
                    )
                }
            }]
        })

        barba.hooks.after(() => 
        {
            locoScroll.update();
        });
    }
}