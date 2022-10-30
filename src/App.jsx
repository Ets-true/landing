import './scss/assets/reset.scss'
import './scss/assets/fonts.scss'
import './scss/App.scss'
import { ReactComponent as Wave } from './media/img/wave.svg';
import { Content } from './content'
import { useEffect } from 'react';
import $ from 'jquery'

function App() {

  useEffect(() => {
    let loader = document.querySelector('.loader')
    let loaderPanel = document.querySelector('.loader-panel')
    loaderPanel.style.transform = "translateX(100vw)"
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500);


    let titleAnimation = document.querySelectorAll('.title-animation-block')
    let textAnimation = document.querySelectorAll('.text-animation-block')
    let opacityAnimation = document.querySelectorAll('.opacity-animation-block')
    let lineLeft = document.querySelector('.line-left')
    let lineRight = document.querySelector('.line-right')
    let flipAnimation = document.querySelectorAll('.flip-animation-block')


    let clientHeight = document.documentElement.clientHeight

    window.addEventListener('scroll', function (e) {
      // let windowTop = $(window).scrollTop() + document.documentElement.clientHeight + 500

      titleAnimation.forEach(item => {
        if ((item.getBoundingClientRect().top <= clientHeight * 0.75)) {
          item.style.transform = 'translateX(100%)'
        } else item.style.transform = 'translateX(0)'
      })

      textAnimation.forEach(item => {
        if ((item.getBoundingClientRect().top <= clientHeight * 0.75)) {
          item.style.transform = 'translateX(100%)'
        } else item.style.transform = 'translateX(0)'
      })

      opacityAnimation.forEach(item => {
        if ((item.getBoundingClientRect().top <= clientHeight * 0.55)) {
          item.style.opacity = '1'
          lineRight.style.width = '594px' //Прикрутить адаптив
          lineLeft.style.left = '-328px' //Прикрутить адаптив
          lineLeft.style.width = '286px' //Прикрутить адаптив
        } else {
          item.style.opacity = '0'
          lineRight.style.width = '0'

          lineLeft.style.left = '-42px' //Прикрутить адаптив
          lineLeft.style.width = '0'
        }
      })

      if(flipAnimation[0].getBoundingClientRect().top <= clientHeight * 0.9){
        flipAnimation[0].children[0].style.opacity = 1
        flipAnimation[0].children[0].style.transform = 'translateY(0)'
        setTimeout(() => {
          flipAnimation[0].children[1].style.opacity = 1
          flipAnimation[0].children[1].style.transform = 'translateY(0)'
        }, 100);

        //запуск второй анимации
      } else {
        flipAnimation[0].children[1].style.opacity = 0
        flipAnimation[0].children[1].style.transform = 'translateY(116px)' //Прикрутить адаптив
        setTimeout(() => {
          flipAnimation[0].children[0].style.opacity = 0
          flipAnimation[0].children[0].style.transform = 'translateY(116px)' //Прикрутить адаптив
        }, 100);
      }


      
    })
  }, [])




  return (
    <div className="App">
      <div className="block-Regeneration">
        <div className="logo"><img src={require('./media/img/RM-logo.png')} alt="" /></div>
        <div className="title-block">
          <div className="title">{Content.Regeneration.title}</div>
          <div className="subtitle">{Content.Regeneration.subtitle}</div>
        </div>
        <div className="wave-block"><Wave /></div>
      </div>
      <div className="background-blue"></div>

      <div className="block-About">
        <div className="about-wrap">
          <div className="about-info">
            <div className="about-title title-animation">
              <div className="title-animation-block"></div>
              Что такое <span>регенерация</span>
            </div>
            <div className="about-text text-animation">
              <div className="text-animation-block"></div>
              {Content.aboutRegeneration.text}
            </div>
          </div>
          <div className="about-tezis-group">
            <div className="line">
              <div className="line-left"></div>
              <div className="line-title opacity-animation-block">{Content.aboutRegeneration.lineTitle}</div>
              <div className="line-right"></div>
            </div>
            <div className="tezis-wrap opacity-animation-block">
            {Content.aboutRegeneration.tezisGroup.map(tezis => {
              return (
                <div className="tezis">
                  <div className="tezis-name">{tezis.name}</div>
                  <div className="tezis-points"></div>
                  <div className="tezis-text">{tezis.text}</div>
                </div>
              )
            })}
             </div>
          </div>
        </div>
      </div>

      <div className="block-More">
          <div className="more-wrap">
            <div className="more-info">
              <div className="more-title title-animation">
                <div className="title-animation-block"></div>
                {Content.aboutMore.title}
              </div>
              <div className="more-text text-animation">
                <div className="text-animation-block"></div>
                {Content.aboutMore.text}
              </div>
            </div>
            <div className="more-content">
               <div className="more-lottie"></div>
               <div className="more-advantage-group">
               {Content.aboutMore.advantageGroup.map(advatnageLine => {
                return (
                  <div className="advantage-line flip-animation-block">
                    {advatnageLine.map(advantage=>{
                      return(
                        <div className="advantage-example">
                          <div className="advantage-title">{advantage.title}</div>
                          <div className="advantage-text">{advantage.text}</div>
                        </div>
                      )
                    })}
                  </div>
                )
               })}
                  {/* <div className="advantage-line">
                      <div className="advantage-example">
                        <div className="advantage-title"></div>
                        <div className="advantage-text"></div>
                      </div>
                  </div> */}
               </div>
            </div>
           
          </div>
      </div>

      <div className="next-block"></div>

      <div className="loader">
        <div className="loader-panel"></div>
      </div>
    </div>
  );
}

export default App;
