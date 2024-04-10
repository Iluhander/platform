"use client"

import Link from 'next/link';

// Components.
import LeadSection from '@/widgets/MainPage/LeadSection/LeadSection';
import AppWrapper from '@/appWrapper';

import './Main.scss';

export default function Main() {
  const sections = [
    {
      leadElement: <iframe src="https://www.youtube.com/embed/jyKWwNAaDg8" title="Видео движка" />,
      header: 'Создавай !',
      mainP: (
        <p style={{ color: '#FF99BE' }}>
          Больше не нужно уметь программировать, чтобы сделать визуальную новеллу. <br />
          Всего за одну минуту ты станешь автором полноценной игры.
        </p>
      ),
      link: {
        href: '/market',
        text: 'Попробовать →'
      },
      forward: true
    },
    {
      leadElement: (
        <Link href="/">
          <div className="mainPageTyan">
            <img src="images/mainpagescreen.png" alt="Рандомные тяны" />
          </div>
        </Link>
      ),
      header: 'Публикуй !',
      mainP: (
        <p style={{ color: '#FF99BE' }}>
          Мы размещаем у себя все новеллы.
          <br />
          А до 31.08.2024 будут выбраны 20 лучших новелл, и их авторы получат множество призов.
          <br />
          <br />
          Создай аккаунт за 30 секунд и получи возможность опубликовать всё, что пожелаешь :)
        </p>
      ),
      link: {
        href: '/register',
        text: 'Зарегистрироваться →'
      },
      forward: false
    }
  ];

  const sectionsRendered = [];
  for (let i = 0; i < sections.length; i += 1) {
    sectionsRendered.push(
      <LeadSection
        leadElement={sections[i].leadElement}
        header={sections[i].header}
        mainP={sections[i].mainP}
        link={sections[i].link}
        forward={sections[i].forward}
        className="mainPageSection"
        key={`lsection${i}`}
      />
    );
  }

  return (
    <AppWrapper>
      <header id="mainPageHeader">
        <img src="favicon.png" alt="UwU Novels" />
        <h1>UWU NOVELS</h1>
        <p>Место, где рождаются истории</p>
      </header>
      {sectionsRendered}
    </AppWrapper>
  );
}
