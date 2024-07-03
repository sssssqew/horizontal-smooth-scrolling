const imgs = [...document.querySelectorAll('.img')]
const slider = document.querySelector('.slider')
let sliderWidth
let imageWidth
let current = 0
let target = 0
let ease = .03 // 스크롤 속도 조절

window.addEventListener('resize', init) // 사이즈 재조정

imgs.forEach((img, idx) => {
    img.style.backgroundImage = `url(./imgs/img-${idx+1}.jpg)`
})
// 선형보간 (linear interpolation) : start + (end - start) * t
// t : 0.3 이면 시작점부터 시작해서 끝점 - 시작점 거리의 30%만큼 이동함
// 부드러운 애니메이션이나 부드러운 스크롤에 사용됨
function lerp(start, end, t){
    return start * (1 - t) + end * t
}
function setTransform(el, transform){
    el.style.transform = transform
}
// sliderWidth - window.innerWidth : 수평으로 스크롤할 거리
// sliderWidth - window.innerWidth + window.innerHeight : 브라우저 높이에서 수평으로 스크롤할 거리를 더함
// 결국 수평스크롤 거리만큼 body 높이를 설정해서 수직스크롤이 끝나면 수평스크롤도 끝나게 맞춤
function init(){
    sliderWidth = slider.getBoundingClientRect().width
    imageWidth = sliderWidth / imgs.length
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}
function animate(){
    console.log('animate')
    current = parseFloat(lerp(current, target, ease)).toFixed(2)
    target = window.scrollY // 스크롤 위치까지 60프레임동안 부드럽게 이동함
    setTransform(slider, `translateX(-${current}px)`)  // 컨테이너를 좌측으로 스크롤
    animateImages()
    requestAnimationFrame(animate)
}
function handleScroll(){
    setTransform(slider, `translateX(-${window.scrollY}px)`)  
}
// ratio : 0 ~ 3.5
// intersectionRatioValu : 0 ~ 100 
// item div 가 400 이고, img div 가 600 이고 양쪽으로 100px 정도 여유가 있으므로
// 100px 만큼만 img div 를 우측으로 이동해도 item div 에 그려진 이미지를 가리지 않음
// 컨테이너가 좌측으로 이동하는 동안 사진을 우측으로 이동하여 관성에 따라 움직이는 효과 적용
function animateImages(){
    const ratio = current / imageWidth
    const intersectionRatioValu = ratio * (100 / 3.5)
    console.log(ratio)
    imgs.forEach((img, idx) => {
        setTransform(img, `translateX(${ratio * (100 / 3.5)}px)`)
    })
}

init()
animate() // 부드러운 스크롤
// window.addEventListener('scroll', handleScroll) // 밋밋한 스크롤 (비교를 위해서)

