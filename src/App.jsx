import './scss/assets/reset.scss'
import './scss/assets/fonts.scss'
import './scss/App.scss'
// import { useEffect } from 'react';

function App() {

  setTimeout(() => {
    let loader = document.querySelector('.content-load')
    loader.style.transform = "translateX(100vw)"
  }, 100)


  return (
    <div className="App">
      <div className="content">
        <div className="content-main">
          <div className="main-title-block">
            <div className="main-title">Регенерация вместо покупки</div>
            <div className="main-subtitle">Восстановление свойств масел <br /> для повторного использования</div>
          </div>
        </div>
      </div>
      <div className="content-load"></div>
    </div>
  );
}

export default App;
