document.addEventListener('DOMContentLoaded', function () {
    const navInit = () => {
        //измененме цвета фона меню
        const navbarCollasible = document.body.querySelector('#mainNav');
        if (window.scrollY === 0) {
            navbarCollasible.classList.remove('navbar-shrink');
        } else {
            navbarCollasible.classList.add('navbar-shrink');
        }

        const links = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');


        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 400)) {
                links.forEach(link => {
                    link.classList.remove('active')
                    if (link.href.split('#').pop() === section.id) {
                        link.classList.add('active')
                    }
                })
            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

    //анимация контента


    const animItems =document.querySelectorAll('.animate');
    if (animItems.length > 0) {
        console.log('here!')
        function onEntry() {
            animItems.forEach(item => {
                const itemHeight = item.offsetHeight;
                const itemOffset = offset(item).top
                const startPos = 2;
                const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

                if(itemHeight > document.documentElement.clientHeight) {
                    const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
                }
                if((window.scrollY > itemOffset - animPoint) && window.scrollY < itemOffset + itemHeight) {
                    item.classList.add('show');
                } else {
                    if(!item.classList.contains('no-hide')) {
                        item.classList.remove('show');
                    }
                }
            })
        }
    }

    /*function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('show');
            } else change.target.classList.remove('show');
        });
    }
    let options = {threshold: [0.5]};
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.animate');

    for (let elm of elements) {
        observer.observe(elm);
    }*/

    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit(); //запускаем функцию при скроле страницы
       onEntry();
    })
    window.addEventListener('resize', () => {
        navInit(); //запускаем функцию при ресайзе страницы
    })

})