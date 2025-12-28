// animação sidebar
document.querySelectorAll("#Close-menu").forEach(function(element) {
    element.addEventListener("click", () =>{
        document.querySelector(".container").classList.toggle("show-menu")
    })
})

// debounce
function debounce(func, wait, immediate) {
    let timeout
    return function(...args) {
        const context = this
        const later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

// animação scroll =============================
const target = document.querySelectorAll("[data-anime]")
const animationClass = "animate"

function animeScroll() {
    const trigger = window.innerHeight * 0.75 // 75% da viewport
    target.forEach(function(element) {
        const rectTop = element.getBoundingClientRect().top
        if (rectTop < trigger) {
            element.classList.add(animationClass)
        } else {
            element.classList.remove(animationClass)
        }
    })
}

function initAnimations() {
    // executa imediatamente ao carregar
    animeScroll()

    // mantém funcionando caso haja rolagem ou mudança de layout
    window.addEventListener('scroll', debounce(animeScroll, 50))
    window.addEventListener('resize', debounce(animeScroll, 100))
    window.addEventListener('load', animeScroll)
}

if (target.length) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations)
    } else {
        initAnimations()
    }
}