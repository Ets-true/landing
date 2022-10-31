import './scss/assets/reset.scss'
import './scss/assets/fonts.scss'
import './scss/App.scss'
import { ReactComponent as Wave } from './media/img/wave.svg';
import { ReactComponent as Mask } from './media/img/mask.svg';
import { Content } from './content'
import { useEffect, useState } from 'react';
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
    let flipAnimationBlock = document.querySelectorAll('.flip-animation-block')
    let kamazAnimation = document.querySelector('.kamaz-animation')
    let kamazAnimationBlock = document.querySelector('.kamaz-animation-block')

    let flipAnimationLineOne = flipAnimationBlock[0]
    let flipAnimationLineTwo = flipAnimationBlock[1]

    let OneOne = flipAnimationLineOne.children[0]
    let OneTwo = flipAnimationLineOne.children[1]

    let TwoOne = flipAnimationLineTwo.children[0]
    let TwoTwo = flipAnimationLineTwo.children[1]



    let clientHeight = document.documentElement.clientHeight
    let scrollCount = 0

    let firstFLip = false
    let secondFLip = false;

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


      if (flipAnimationLineOne.getBoundingClientRect().top <= clientHeight * 0.9) {

        if (firstFLip === false) {
          OneOne.style.opacity = 1; OneOne.style.transform = 'translateY(0)'
          setTimeout(() => {
            OneTwo.style.opacity = 1; OneTwo.style.transform = 'translateY(0)'
          }, 100);
          scrollCount = $(window).scrollTop()
          firstFLip = true
        }

        if ($(window).scrollTop() - scrollCount >= 1000) { //Прикрутить адаптив
          if (secondFLip === false) {
            OneOne.style.opacity = 0; OneOne.style.transform = 'translateY(-116px)'; //Прикрутить адаптив
            TwoOne.style.opacity = 1; TwoOne.style.transform = 'translateY(-116px)';  //Прикрутить адаптив
            setTimeout(() => {
              OneTwo.style.opacity = 0; OneTwo.style.transform = 'translateY(-116px)'; //Прикрутить адаптив
              TwoTwo.style.opacity = 1; TwoTwo.style.transform = 'translateY(-116px)'; //Прикрутить адаптив
            }, 100);
            secondFLip = true
          }
        } else {
          if (secondFLip === true) {
            TwoOne.style.opacity = 0; TwoOne.style.transform = 'translateY(0)';
            OneOne.style.opacity = 1; OneOne.style.transform = 'translateY(0)';
            setTimeout(() => {
              TwoTwo.style.opacity = 0; TwoTwo.style.transform = 'translateY(0)';
              OneTwo.style.opacity = 1; OneTwo.style.transform = 'translateY(0)';
            })
            secondFLip = false
          }
        }
      } else {
        if (firstFLip === true) {
          OneOne.style.opacity = 0; OneOne.style.transform = 'translateY(116px)' //Прикрутить адаптив
          setTimeout(() => {
            OneTwo.style.opacity = 0; OneTwo.style.transform = 'translateY(116px)' //Прикрутить адаптив
          }, 100);
          firstFLip = false
        }
      }

      if ((kamazAnimation.getBoundingClientRect().top <= clientHeight * 0.7)) {
        kamazAnimationBlock.style.transform='translateX(1100px)'
      } else {
        kamazAnimationBlock.style.transform='translateX(0)'
      }

    })


    let questions = document.querySelectorAll(".QA-question");
    
    let pointPositions = []
    let startPosition = 53
    let endPosition = questions[6].offsetTop + questions[6].offsetHeight

    questions.forEach(question => {
      let position = Math.floor((question.offsetTop + question.offsetHeight/2 - startPosition) / endPosition * 1000)
      console.log(position)
      pointPositions.push(position)
    })
    console.log(pointPositions)

    const getNumber = (arr, searchNum) => 
      arr.find(it => Math.abs(it - searchNum) === Math.min(...arr.map(it => Math.abs(it - searchNum))));

    let control = document.querySelector(".control");
    
    control.oninput = function() {
      console.log(getNumber(pointPositions, this.value))
    }
  }, [])

  const [answer, setAnswer] = useState([`.01 ${Content.QA.questions[0].title}`, Content.QA.questions[0].text])

  const showAnswer = (index) => {
    setAnswer([`.0${index+1} ${Content.QA.questions[index].title}`, Content.QA.questions[index].text])
  }


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
                    {advatnageLine.map(advantage => {
                      return (
                        <div className="advantage-example">
                          <div className="advantage-title">{advantage.title}</div>
                          <div className="advantage-text">{advantage.text}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="block-Work">
        <div className="work-wrap">
          <div className="work-title title-animation">
            <div className="title-animation-block"></div>
            {Content.aboutWork.title}
          </div>
          <div className="work-info">
            <div className="work-kamaz kamaz-animation">
              <div className="kamaz-mask kamaz-animation-block"><Mask/></div>
              <img src={require('./media/img/murm.png')} alt="" />
            </div>
            <div className="work-points"></div>
          </div>
        </div>
      </div>

      <div className="block-Form">
        <div className="Form-title">{Content.Form.title}</div>
        <div className="Form-button">{Content.Form.button}</div>
        <div className="Form-body"></div>
      </div>

      <div className="block-Partners">
        <div className="Partners-wrap">
          <div className="partners-title title-animation">
            <div className="title-animation-block"></div>
            {Content.aboutPartners.title}
          </div>
          <div className="partners-row">
            {Content.aboutPartners.partners.map((partner,index)=>{
              return(
                // <a href='' about='blanc'></a>
                <div className="partner">
                  <div className="partner-img opacity-animation-block"><img src={require(`./media/img/partners/${index+1}.png`)} alt="" /></div>
                  <div className="partner-name text-animation">
                    <div className="text-animation-block"></div>
                    {partner.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* <div className="next-block"></div> */}

      <div className="block-QA">
        <div className="QA-wrap">
           <div className="QA-title title-animation">
              <div className="title-animation-block"></div>
              {Content.QA.title}
            </div>
           <div className="QA">
            <div className="QA-questions">
              <div class="control-wrap">
                <div className="control-body">
                  <div className="line"></div>
                   <input type="range" min={1} max={1000} defaultValue="25" className="control"/>
                </div>
              </div>
              {Content.QA.questions.map((question, index)=>{
                return(
                  <div className="QA-question" onClick={()=>{showAnswer(index)}}>
                    <div className="QA-question-number">.0{index+1}</div>
                    <div className="QA-question-title">{question.title}</div>
                  </div>
                )
              })}
            </div>
            <div className="QA-answer-panel">
                <div className="question">{answer[0]}</div>
                <div className="answer">{answer[1]}</div>
            </div>
           </div>
        </div>
      </div>

      <div className="loader">
        <div className="loader-panel"></div>
      </div>
    </div>
  );
}

export default App;
