import './styles/style.css'
import './styles/loco.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import Burger from './moduls/Burger'
import Home from './moduls/Home'
import Link from './moduls/Link'
import Rotate from './moduls/Rotate'
import Text from './moduls/Text'
// import LocoGsap from './moduls/LocoGsap'
import Footer from './moduls/Footer'
import Loader from './moduls/Loader'

const checkPages = () => 
{
    const burger = new Burger()
    const home = new Home()
    const link = new Link()
    const rotate = new Rotate()
    const text = new Text()
    // const locogsap = new LocoGsap()
    const footer = new Footer()
    const loader = new Loader()

    console.log('update');
}
checkPages()

// const updateModules = () => 
// {
//     rotate()
// }

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

barba.use(barbaPrefetch);

barba.init(
{
    cacheIgnore: false,
    prefetchIgnore: false,
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
            )
        },
        after()
        {
            return (
                locoScroll.update(),
                checkPages(),
                ScrollTrigger.refresh(),
                console.log('transition')
            )
        }
    }]
})

// barba.hooks.after(() => 
// {
//     locoScroll.init(),
//     inst(),
//     console.log('transition');
// })

