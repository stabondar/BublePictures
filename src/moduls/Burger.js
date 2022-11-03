import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText';
import Lottie from 'lottie-web';

gsap.registerPlugin(SplitText)

export default class Burger {
    constructor() {
        const init = () => 
        {
            let trigger = $('.nav__burger')
            let nav = $('.nav')
            let navBg = nav.find('.nav__bg')
            let burger = $('.burger')
            let items = $('.burger__item--out')
            let loopRow = $('.burger__loop')
            let logo = $('.nav__logo')
            let contact = $('.nav__contact').find('p')
            let sequence = { frame: 0 },
            burgerLottie = Lottie.loadAnimation(
            {
                container: document.querySelector('.nav__burger'),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'https://uploads-ssl.webflow.com/635fa077b165568321fb6f3e/635fcc543ea9350d9d174f70_Burger.json'
            })

            // Loop Function
            let itemLoop = $('.burger__loop--item')
            let tlLoop = gsap.timeline({repeat: -1})
            tlLoop.to(itemLoop, {xPercent: -100, duration: 30, ease: 'none'})

            let tl = gsap.timeline(
            {
                paused: true, defaults: {stagger: 0.04, ease: 'power3'}
            })

            //  Get a path from Lottie
            let path
            setTimeout(() => {
                path = trigger.find('path')
            }, 1000);
    
            burgerLottie.addEventListener('DOMLoaded', function () 
            {
                setTimeout(() => {    
                    tl.to(sequence,
                    {
                        frame: burgerLottie.totalFrames - 1,
                        ease: 'none',
                        onUpdate: () => burgerLottie.goToAndStop(sequence.frame, true),
                        duration: 1
                    }, '<')
                    .to(burger, {display: 'block', duration: 0}, '<')
                    .to(path, {fill: 'white'}, '<')
                    .to(navBg, {opacity: 0, duration: 0.3}, '<')
                    .from(burger, {transformOrigin: 'top', scaleY: 0, duration: 1}, '<')
                    .to(logo, {filter: 'invert(100%) grayscale(100%)'}, '<')
                    .to(contact, {color: 'white'}, '<')
                    .from(items, {yPercent: -100, stagger: 0.1}, '<0.3')
                    .from(loopRow, {yPercent: 100, opacity: 0}, '<0.3')
                }, 1000);
            })

            //  Double Click Function
            $(function () 
            {
                let burgerClicks = [function () 
                {
                    tl.restart();
                    tlLoop.play()
                },

                function () 
                { 
                    setTimeout(function () 
                    {
                        counter = 0;
                    }, 200); 
                    tl.timeScale(1.4).reverse(); 
                    setTimeout(() => {
                        tlLoop.pause()
                    }, 400);
                } ];

                let counter = 0;
                $(trigger).on('click', function () {
                    if (counter >= 2) return false;
                    burgerClicks[counter]();
                    counter++;
                });
            });

            /**
             * Hover function
             */
            const hover = () => 
            {
                let item = $('.burger__item')
                $(item).each(function()
                {
                    let self = $(this)
                    let outText = self.find('.burger__item--out').find('.h--158')
                    let inText = self.find('.burger__item--in').find('.h--158')
                    let splitOut = new SplitText(outText, {type: 'chars'})
                    let splitIn = new SplitText(inText, {type: 'chars'})
                    let tl = gsap.timeline({ paused: true, defaults: {duration: 0.8, ease: 'power2', stagger: 0.04} })

                    tl.to(splitOut.chars, { yPercent: -100 })
                    .to(splitIn.chars, { yPercent: -100 }, '<')

                    self.on('mouseenter', () => tl.restart())
                    self.on('mouseleave', () => tl.timeScale(1.5).reverse())
                })
            }
            hover()
        }
        window.addEventListener('load', () => init())
    }
}


