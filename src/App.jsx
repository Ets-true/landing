import './scss/assets/reset.scss'
import './scss/assets/fonts.scss'
import './scss/App.scss'
import { ReactComponent as Wave } from './media/img/wave.svg';
import { ReactComponent as Mask } from './media/img/mask.svg';
import { ReactComponent as File } from './media/img/files.svg';
import { Content } from './Content'
import { useEffect, useState, useRef } from 'react';
import $ from 'jquery'
import lottie from 'lottie-web'
import animationData from './media/lottie/RM-lottie.json'

function App() {

  const calc = (val) => {
    if (document.documentElement.clientWidth < 1920) {
      return val * 1024 / 1920 + (val - val * 1024 / 1920) * ((document.documentElement.clientWidth - 1024) / (1920 - 1024))
    } else return val
  }

  const lottieRef = useRef(null)
  let pointPositions = []
  let control
  let FormButton
  let FormLine
  let FormBody
  let Form

  let push


  useEffect(() => {
    let loader = document.querySelector('.loader')
    let loaderPanel = document.querySelector('.loader-panel')
    loaderPanel.style.transform = "translateX(100vw)"
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500);

    push = document.querySelector('.push')

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

    const Footer = document.querySelector('.block-Footer')
    const Body = document.querySelector('.App-body')
    let res
    let footerTrigger = false

    let blockWork = document.querySelector('.block-Work')
    let points = document.querySelector('.work-points').children
    points[3].style.opacity = 0
    points[3].children[1].style.transform = `translateX(${calc(100)}px)`
    points[4].style.opacity = 0
    points[4].children[1].style.transform = `translateX(${calc(100)}px)`

    let pointsTrigger = false
    let pointsScrollTop
    let firstPointStep = false
    let secondPointStep = false
    let scrollPosition

    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      animationData: animationData,
      autoplay: false,
    })


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

      opacityAnimation.forEach((item, index) => {
        if (item.getBoundingClientRect().top <= clientHeight * 0.55) {
          item.style.opacity = '1'
          if (index === 0) {
            lineRight.style.width = `${calc(594)}px`
            lineLeft.style.left = `-${calc(339)}px`
            lineLeft.style.width = `${calc(286)}px` //Прикрутить адаптив
          }
        } else {
          item.style.opacity = '0'
          if (index === 0) {
            lineRight.style.width = '0'
            lineLeft.style.left = `-${calc(42)}px`
            lineLeft.style.width = '0'
          }
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

        if ($(window).scrollTop() - scrollCount >= calc(1000)) {
          if (secondFLip === false) {
            OneOne.style.opacity = 0; OneOne.style.transform = `translateY(-${calc(116)}px)`;
            TwoOne.style.opacity = 1; TwoOne.style.transform = `translateY(-${calc(116)}px)`;
            setTimeout(() => {
              OneTwo.style.opacity = 0; OneTwo.style.transform = `translateY(-${calc(116)}px)`;
              TwoTwo.style.opacity = 1; TwoTwo.style.transform = `translateY(-${calc(116)}px)`;
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
          OneOne.style.opacity = 0; OneOne.style.transform = `translateY(${calc(116)}px)`
          setTimeout(() => {
            OneTwo.style.opacity = 0; OneTwo.style.transform = `translateY(${calc(116)}px)`
          }, 100);
          firstFLip = false
        }
      }

      if ((kamazAnimation.getBoundingClientRect().top <= clientHeight * 0.6)) {
        kamazAnimationBlock.style.transform = `translateX(${calc(1100)}px)`
      } else {
        kamazAnimationBlock.style.transform = 'translateX(0)'
      }

      if (blockWork.getBoundingClientRect().top <= 0) {
        if (pointsTrigger === false) {
          pointsScrollTop = $(window).scrollTop()
          pointsTrigger = true
        }
        if ($(window).scrollTop() - pointsScrollTop >= 300 && firstPointStep === false) {
          for (let point of points) { point.style.transform = `translateY(-${calc(244)}px)` }
          points[0].style.opacity = 0
          points[3].style.opacity = 1
          points[3].children[1].style.transform = `translateX(0)`

          firstPointStep = true
        } else if ($(window).scrollTop() - pointsScrollTop < 300 && firstPointStep === true) {
          for (let point of points) { point.style.transform = 'translateY(0)' }
          points[0].style.opacity = 1
          points[3].style.opacity = 0
          firstPointStep = false
          points[3].children[1].style.transform = `translateX(${calc(100)}px)`

        }
        if ($(window).scrollTop() - pointsScrollTop >= 900 && secondPointStep === false) {
          for (let point of points) { point.style.transform = `translateY(-${calc(488)}px)` }
          points[1].style.opacity = 0
          points[4].style.opacity = 1
          points[4].children[1].style.transform = `translateX(0)`

          secondPointStep = true
        } else if ($(window).scrollTop() - pointsScrollTop < 900 && secondPointStep === true) {
          for (let point of points) { point.style.transform = `translateY(-${calc(244)}px)` }
          points[1].style.opacity = 1
          points[4].style.opacity = 0
          secondPointStep = false
          points[4].children[1].style.transform = `translateX(${calc(100)}px)`

        }
      }


      // if ((Footer.getBoundingClientRect().top <= clientHeight)) {
      res = (Footer.getBoundingClientRect().top / clientHeight) * 1.97
      if (res <= 1 && footerTrigger == false) {
        footerTrigger = true
        res = 0.95
        Body.style.transform = `scale(${res})`
        Footer.style.opacity = 1;
      }
      if (res > 1 && footerTrigger) {
        footerTrigger = false
        Body.style.transform = `scale(1)`
        Footer.style.opacity = 0;
      }
      // }



      scrollPosition = $(window).scrollTop() - document.querySelector('.block-More').offsetTop
      if (scrollPosition >= 0) {
        let frame = (anim.totalFrames / 100) * (scrollPosition / (document.querySelector('.block-More').offsetHeight / 160));
        if(frame<260){
          anim.goToAndStop(frame, true);
        }
      }

    })

    FormButton = document.querySelector('.Form-button')
    FormLine = document.querySelector('.Form-line')
    FormBody = document.querySelector('.Form-body')
    Form = document.querySelector('.block-Form')


  }, [])


  const [answer, setAnswer] = useState([`.01 ${Content.QA.questions[0].title}`, Content.QA.questions[0].text])

  let temp
  const animationFunc = (value) => {
    if (control.value < value) {
      temp = control.value
      temp++
      control.value = temp
      setTimeout(() => {
        animationFunc(value)
      }, 1);
    }

    if (control.value > value) {
      temp = control.value
      temp--
      control.value = temp
      setTimeout(() => {
        animationFunc(value)
      }, 1);
    }
  }



  useEffect(() => {
    // $(document).scrollTop(window.scrollY+1);
    // $(document).scrollTop(window.scrollY-1);
    // console.log(window.scrollY)
    control = document.querySelector(".control");
    let questions = document.querySelectorAll(".QA-question");

    // let pointPositions = []
    let startPosition = 53
    let endPosition = questions[6].offsetTop + questions[6].offsetHeight

    questions.forEach(question => {
      let position = Math.floor((question.offsetTop + question.offsetHeight / 2 - startPosition) / endPosition * 1000)
      pointPositions.push(position)
    })

    const getNumber = (arr, searchNum) =>
      arr.find(it => Math.abs(it - searchNum) === Math.min(...arr.map(it => Math.abs(it - searchNum))));

    let ind, num



    control.oninput = function () {
      num = getNumber(pointPositions, this.value)
      ind = pointPositions.indexOf(num)
      setAnswer([`.0${ind + 1} ${Content.QA.questions[ind].title}`, Content.QA.questions[ind].text])
    }

    control.onchange = function () {
      num = getNumber(pointPositions, this.value)
      animationFunc(num)
      ind = pointPositions.indexOf(num)
      setAnswer([`.0${ind + 1} ${Content.QA.questions[ind].title}`, Content.QA.questions[ind].text])
    }
  }, [answer])


  const showAnswer = (index) => {
    // animationFunc(pointPositions[index])
    control.value = pointPositions[index]
    setAnswer([`.0${index + 1} ${Content.QA.questions[index].title}`, Content.QA.questions[index].text])
  }



  const openForm = () => {
    Form.style.height = `${calc(1030)}px`
    FormButton.style.opacity = 0
    FormButton.style.display = 'none'
    FormLine.style.display = 'block'
    FormLine.style.display = 'block'
    FormLine.style.width = `${calc(1036)}px`
    FormBody.style.display = 'block'
    FormBody.style.opacity =  1

    // $(document).scrollTop(window.scrollY+calc(300));
   
      window.scrollTo({
        top: window.scrollY+calc(400),
        behavior: "smooth"
      });
    
  }

  const closeForm = ()=>{
    Form.style.height = `${calc(265)}px`
    FormButton.style.opacity = 1
    FormButton.style.display = 'block'

    FormLine.style.width = `0px`
    FormLine.style.display = 'none'
    FormBody.style.opacity =  0
    setTimeout(() => {
      FormLine.style.display = 'none'
      FormBody.style.display = 'none'
    }, 500);
    // $(document).scrollTop(window.scrollY-calc(300));
    window.scrollTo({
      top: window.scrollY-calc(400),
      behavior: "smooth"
    });

  }

  const showPush = () => {
    push.style.transform = `translate3d(-50%, 0, 0)`
    push.style.opacity = 1
    setTimeout(() => {
      closePush()
    }, 5000);
  }

  const closePush = () => {
    push.style.transform = `translate3d(-50%, ${calc(50)}px, 0)`
    push.style.opacity = 0
  }

  const sendMail = () => {
    let formData = new FormData();
    let name = document.querySelector('#name').value
    let phone = document.querySelector('#phone').value
    let email = document.querySelector('#email').value
    let text = document.querySelector('#text').value

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('text', text);

    $.ajax({
      url: 'https://mail.regeneration-oil.ru/mail.php', 
      dataType: 'text', 
      cache: false,
      contentType: false,
      processData: false,
      data: formData,                         
      type: 'post',
      beforeSend: function(){
      },
      success: function(){
      }
    });

    document.querySelector('#name').value = ''
    document.querySelector('#phone').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#text').value = ''

    closeForm()
    showPush()
  }

  const gotoForm = () =>{
    window.location.hash="form"
    let scrollTT = window.scrollY
    openForm()
    var uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0,uri.indexOf("#"));

        window.history.replaceState({},document.title, clean_uri);
    }
    window.scrollTo({
      top:scrollTT+calc(300),
      behavior: "smooth"
    });
    // window.scrollTo({
    //   top: Form.getBoundingClientRect().top - document.documentElement.clientHeight,
    //   behavior: "smooth"
    // });
  }






  return (
    <div className="App">
      <div className="App-body">
        <div className="block-Regeneration">
          <div className="sticky-wrap">
            <div className="logo"><img src={require('./media/img/RM-logo.png')} alt="" /></div>
            <div className="title-block">
            <div className="title">{Content.Regeneration.title}</div>
            <div className="subtitle">{Content.Regeneration.subtitle}</div>
            </div>
          </div>
          <div className="wave-block"><Wave /></div>
        </div>
        <div className="background-blue"></div>

        <div className="content-container">
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
                  <div className="line-text opacity-animation-block">{Content.aboutRegeneration.lineTitle}</div>
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
                <div className="lottie-wrap">
                  <div className="more-lottie" id="lottie" ref={lottieRef}></div>
                </div>
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
                  <div className="kamaz-mask kamaz-animation-block"><Mask /></div>
                  <img src={require('./media/img/murm.png')} alt="" />
                </div>
                <div className="work-points">
                  {Content.aboutWork.pointNames.map((pointName, index) => {
                    return (
                      <div className="point-example" key={`point-${index}`}>
                        <div className="point-num">.0{index + 1}</div>
                        <div className="point-name">{pointName}</div>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block-Form" id="form">
          <div className="Form-title">{Content.Form.title}</div>
          <div className="Form-button" onClick={openForm}>{Content.Form.button}</div>
          <div className="Form-line"></div>
          <div className="Form-body">
            <div className="form">
              <div className="form__wrapper">
                <div className="form__body">
                  <div className="form__animationBlock">
                    <div className="form__title">Обратная связь</div>
                    <div className="line">
                      <div className="line__body"></div>
                    </div>
                    <div className="line">
                      <div className="line__body"></div>
                    </div>
                    <div className="dataBlock__column_left">
                      <div className="point">
                        <div className="point__num">.01</div>
                        <div className="point__title">Ваше имя:</div>
                      </div>
                      <input id="name" type="text" placeholder="Иван Иванов" />
                      <div className="point">
                        <div className="point__num">.02</div>
                        <div className="point__title">Email:</div>
                      </div>
                      <input id="email" className="mail-input" type="text" placeholder="info@gmail.com" />
                      <div className="point">
                        <div className="point__num">.03</div>
                        <div className="point__title">Телефон:</div>
                      </div>
                      <input id="phone" type="text" placeholder="+7 (495) 900-70-70" />
                    </div>
                    <div className="dataBlock__column_right">
                      <div className="wrapper">
                        <div className="posab-wrapper">
                          <div className="point">
                            <div className="point__num">.04</div>
                            <div className="point__title">Сообщение:</div>
                          </div>
                          <textarea id="text" placeholder='Текст вашего сообщения пишите здесь' />
                        </div>
                      </div>

                    </div>
                    <div className="send-button" onClick={sendMail}>
                      <div className="loading"></div>
                      Отправить
                    </div>
                    <div className="send-button send-button-close" onClick={closeForm}>
                      <div className="loading"></div>
                      Свернуть форму
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="content-container">
          <div className="block-Partners">
            <div className="Partners-wrap">
              <div className="partners-title title-animation">
                <div className="title-animation-block"></div>
                {Content.aboutPartners.title}
              </div>
              <div className="partners-row">
                {Content.aboutPartners.partners.map((partner, index) => {
                  return (
                    <div className="partner">
                      <div className="partner-img opacity-animation-block"><img src={require(`./media/img/partners/${index + 1}.png`)} alt="" /></div>
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
                      <input type="range" min={1} max={1000} defaultValue="25" className="control" />
                    </div>
                  </div>
                  {Content.QA.questions.map((question, index) => {
                    return (
                      <div className="QA-question" onClick={() => { showAnswer(index) }}>
                        <div className="QA-question-number">.0{index + 1}</div>
                        <div className="QA-question-title">{question.title}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="QA-answer-panel">
                  <div className="question text-animation">
                    <div className="text-animation-block"></div>
                    {answer[0]}
                  </div>
                  <div className="answer text-animation">
                    <div className="text-animation-block"></div>
                    {answer[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="loader">
          <div className="loader-panel"></div>
        </div>
      </div>

      <div className="container-footer">
        <div className="block-Footer">
          <div className="Footer-row">
            <div className="Footer-form">
              <div className="form-title">{Content.Footer.form.formText}</div>
              <div className="form-button" onClick={() => gotoForm()}>{Content.Footer.form.formButton}</div>
              <div className="RM">{Content.Footer.form.RM}</div>
              <div className="copyright">{Content.Footer.form.copyright}</div>
            </div>
            <div className="Footer-info">
              <div className="info-column">
                <div className="info-block">
                  <div className="title">{Content.Footer.info.phone.title}</div>
                  <div className="text">{Content.Footer.info.phone.value}</div>
                </div>
                <div className="info-block">
                  <div className="title">{Content.Footer.info.address.title}</div>
                  <div className="text">{Content.Footer.info.address.value}</div>
                </div>
              </div>
              <div className="info-column">
                <div className="info-block">
                  <div className="title">{Content.Footer.info.mail.title}</div>
                  <div className="text">{Content.Footer.info.mail.value}</div>
                </div>
                <div className="info-block">
                  <a href="https://promtech.site/files/card.pdf" target="_blank">
                    <div className="company-card">
                      <div className="card-title">{Content.Footer.info.card.title}</div>
                      <div className="card-icon"><File /></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="info-column">
                <div className="info-block">
                  <div className="title">{Content.Footer.info.site.title}</div>
                  <div className="text"><a href="https://promtech.site" target='_blank'>{Content.Footer.info.site.value}</a></div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="Footer-department">powered by <a href="https://departmentview.ru" target='_blank'>department</a></div> */}
        </div>
      </div>

      <div className="push">
        <div className="push-text">Ваше письмо доставлено</div>
        <div className="push-button" onClick={closePush}>Закрыть</div>
      </div>



    </div>
  );
}

export default App;
