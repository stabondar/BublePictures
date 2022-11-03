import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default class Home {
    constructor() {
        const init = () => 
        {
            let mm = gsap.matchMedia();
            let isDesktop = "(min-width: 991px)";

            /**
             * Hero Video
             */
            const hero = () => 
            {
                let vidoSection = $('.hero')
                let btn = vidoSection.find('.hero__circle--parent')
                let btnText = btn.find('p').eq(1)

                mm.add(isDesktop, () => {
                    let tlHover = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: "power2" } })
                    tlHover.from(btn, { opacity: 0 })

                    vidoSection.on('mouseenter', () => tlHover.restart())
                    vidoSection.on('mouseleave', () => tlHover.reverse())
                })

                vidoSection.on("click", function () {
                    let myVideo = $(this).find("video");
                    $(this).toggleClass("playing");
                    if ($(this).hasClass("playing")) {
                        btnText.text('off')
                        myVideo.prop("muted", false);
                        myVideo.prop("currentTime", 0);
                    } else {
                        myVideo.prop("muted", true);
                        btnText.text('on')
                    }
                });
            }
            hero()

            /**
             * About Text Scroll
             */
            const aboutScroll = () => 
            {
                let item = $('.about__descr')
                let text = item.find('h2')
                let split = new SplitText(text, {type: 'lines'})
                $(split.lines).append("<div class='line-mask'></div>")
                let mask = item.find('.line-mask')
                let tl = gsap.timeline(
                {
                    scrollTrigger: { trigger: item, start: 'top 80%', end: 'center 40%', scrub: 1 }
                })
                tl.to(mask, {width: '0%', duration: 1, stagger: {amount: 2, ease: 'none'}}) 
                  
            }
            aboutScroll()

            /**
             * Indexing
             */
            const workSection = () =>
            {
                let list = $('.work__list')
                let item = list.find('.work__item')
                let length = item.length
                $(item).each(function(i)
                {
                    let self = $(this)
                    let index = i + 1
                    let indexText = self.find('.work__index').find('p').eq(0)
                    let lenghtText = self.find('.work__index').find('p').eq(2)
                    indexText.text('0' + index)
                    lenghtText.text('0' + length)
                })
            }
            workSection()

            /**
             * Change color on Scoll
             */
            const changeColor = () => 
            {
                let body = $('body')
                let nav = $('.nav')
                let navBg = nav.find('.nav__bg')
                let workSection = $('.work')
                let workTitle = workSection.find('h2')
                let logo = nav.find('.nav__logo')
                let navContact = nav.find('.nav__contact').find('p')
                let divider = workSection.find('.work__divider')
                let triggerBlack = workSection.find('.work__item:nth-child(odd)')
                let triggerWhite = workSection.find('.work__item:nth-child(even)')
                let path
                setTimeout(() => {
                    path = $('.nav__burger').find('path')
                }, 1000);

                $(triggerBlack).each(function()
                {
                    let self = $(this)
                    let tlBlack = gsap.timeline(
                    {
                        scrollTrigger: {trigger: self, start: 'top 60%', end: 'top 60%', scrub: 1}, defaults: {duration: 0.4}
                    })

                    setTimeout(() => {
                        tlBlack.to(body, {backgroundColor: '#0B1219', color: '#FFFFFF'})
                        .to(divider, {backgroundColor: '#1D2B1D'}, '<')
                        .to(navBg, {backgroundColor: 'rgba(11, 18, 25, 0.8)'}, '<')
                        .to(path, {fill: 'white'}, '<')
                        .to(logo, {filter: 'invert(100%) grayscale(100%)'}, '<')
                        .to(workTitle, {color: '#F69999'}, '<')
                        .to(navContact, {color: '#FFFFFF'}, '<')
                    }, 1000);
                })

                $(triggerWhite).each(function()
                {
                    let self = $(this)
                    let tlWhite = gsap.timeline(
                    {
                        scrollTrigger: {trigger: self, start: 'top 60%', end: 'top 60%', scrub: 1}, defaults: {duration: 0.4}
                    })

                    setTimeout(() => {
                        tlWhite.to(body, {backgroundColor: '#FFFFFF', color: '#0B1319'})
                        .to(divider, {backgroundColor: '#A6A6A6'}, '<')
                        .to(navBg, {backgroundColor: 'rgba(255, 255, 255, 0.8)'}, '<')
                        .to(path, {fill: '#0B1219'}, '<')
                        .to(logo, {filter: 'invert(0%) grayscale(0%)'}, '<')
                        .to(navContact, {color: '#0B1319'}, '<')
                    }, 1000);
                })
            }
            changeColor()

            
        }
        window.addEventListener('load', () => init())
    }
}
