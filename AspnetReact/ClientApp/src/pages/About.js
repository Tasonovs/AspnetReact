import React from 'react'
import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import './style.css'

export default function About() {
    return (
        <Container>
            <ReactMarkdown className="m-2" remarkPlugins={[gfm]} children="
                # О проекте
                Данный учебный курсовой проект сделан по заданию компании Itransition *(май 2021)*.
                
                ## Начало рабочего процесса
                При старте, основа приложения была создана с помощью одного из официальных [шаблонов](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-5.0) Microsoft, а именно `dotnet new react -o <output_directory_name> -au Individual`, с надеждой на то, что разработчики заложили в него правильную и простую структуру Full-stack приложения. Это было сделано, чтобы не допустить архитектурных ошибок ещё на старте приложения.  
                В шаблоне уже был встроен стандартный модуль **Identity** с функционалом регистрации, логина, подтвержения e-mail *(правда всё это на Razor-pages)*. Также была папка ClientApp с React SPA приложением, роутами, API авторизации.  
                К сожалению шаблон хорошо себя паказал только на старте, но при постепенном разрастании сложности проекта с ним **начались проблемы**.  
                Вывод: при работе со сложными проектами нужно с опаской относиться к шаблонам проектов и наращивать необходимый функционал постепенно и с нуля.  
                
                ## Какие технологии использовались:
                ### Для клинтской части приложения:
                ##### React
                - react-hook-form (*для более простой работы с формами на React*)
                - react-select (*потрясающее решение для всех видов выпадающих списков*)
                - react-icons (*сборник бесплатных иконок для React, который легко использовать*)
                - react-markdown (*компонент, поддерживающий [Markdown](https://www.markdownguide.org/basic-syntax/) разметку для создания красивых пользовательских описаний проектов*)
                - react-bootstrap (*интегрированный в реакт [Bootstrap](https://bootstrap-4.ru/) фреймворк*)
                - axios (*удобный инструмент для создания запросов на сервер*)
                - ...

                ### Для серверной части приложения
                ##### ASP.NET (.NET 5)
                - ASP.NET Core Identity
                - Newtonsoft.Json (*библиотека для удобной работы с JSON форматом*)
                - ...
                ##### ORM для работы с данными
                - Entity Framework Core
                - SQL Server
                
                ## Что выполнено/реализовано:
                - Авторизация (функционал входа и регистрации, страница пользователя с его данными), неавторизованные пользователи могут только просматривать кампании в режиме read-only
                - функционал регистрации
                - функционал входа
                - страница пользователя с его данными и возможностью их редактирования
                - неавторизованные пользователи могут только просматривать кампании в режиме read-only
                - Личная страница пользователя с его кампаниями, возможностью просмотра и редактирования
                - Использование CSS фреймворка (использовался **Bootstrap**)
                - Страница кампании
                - Форма создания/редактирования кампаний
                - Загрузка картинок на сервер, а не в базу данных
                - Загрузка картинок в форму может осуществляться grag-and-drop методом
                - Ввод тегов в форме создания/редактирования кампании *(связь многие-ко-многим)* с возможностью **создавать и добавлять новые**

                ## Не реализовано *(из-за нехватки времени или по незнанию)*:
                - Поддержка 2-х языков *(самый простой способ - это компонент-константа со всеми фразами и их переводом)*
                - Поддержка 2-х тем оформления [*(как это сделать)*](https://www.npmjs.com/package/react-css-theme-switcher)
                - Динамическое обновление комментариев *(работа с Web-сокетами была продемонстрировано в 6-ой задаче, не хватило времени)*
                - Новости кампании
                - Бонусы и перевод средств
                - Полнотекстовый поиск по сайту
                - Профиль администратора
                " />
        </Container>
    )
}
