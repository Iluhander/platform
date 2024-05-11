'use client';

import './globals.scss';
import './ErrorFallback.css';

export default function ErrorFallback() {
  return (
    <div className="errorFallback">
      <h2>Злостные баги выпрыгнули из засады и сломали страницу !</h2>
      <img
        className="errorFallbackBug"
        src="/icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          top: -10,
          left: 20,
          transform: 'rotate(30deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="/icons/bug.png"
        alt=""
        style={{
          width: 120,
          height: 120,
          bottom: -10,
          right: 20,
          transform: 'rotate(-70deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="/icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          bottom: 110,
          left: 40,
          transform: 'rotate(10deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="/icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          top: 90,
          right: 30,
          transform: 'rotate(170deg)'
        }}
      />
      <div className="errorFallbackVariants">
        <ul>
          <li className="errorFallbackFirstOption">
            <a href="">
              Сразиться с ними{' '}
              <span className="errorFallbackVariantsHint">(перезагрузка страницы ⟳)</span>
            </a>
          </li>
          <li className="errorFallbackSecondOption">
            <a href="/">
              Бежать <span className="errorFallbackVariantsHint">(на главную)</span>
            </a>
          </li>
          <li className="errorFallbackThirdOption">
            <a href="/team">
              <img src="/images/redlightsaber.png" alt="" />
              Перейти на их сторону{' '}
              <span className="errorFallbackVariantsHint">(стать разработчиком "UwU Novels")</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
