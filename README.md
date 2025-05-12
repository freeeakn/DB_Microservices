# DB_Microservices

## Микросервисная архитектура с:

    Изолированными БД (MSSQL для auth, MongoDB для чатов)

    Асинхронной коммуникацией через RabbitMQ

    Единой точкой входа (Gateway)

## Технологический стек

 **Gateway: TypeScript, NestJs, JWT**

 **Auth Servic: TypeScript, NestJs, JWT, MSSQL**

 **Chat Service: TypeScript, NestJs, MongoDB**

 **Инфраструктура: Docker, Prometheus, Grafana, RabbitMQ**

### Архитектурная диаграмма (Deployment Diagram)

  ![Deployment Diagram](./img/Deployment%20Diagram.png)

## Use Case Diagram

  ![Use Case Diagram](./img/useCase.png)

## Диаграмма активности (Авторизация)

  ![Диаграмма активности (Авторизация)](./img/activity.png)

## Метрики

### ER-диаграмма MSSQL (Auth)

  ![ER-диаграмма MSSQL (Auth)](./img/er.png)

### Схема MongoDB (Chat)

  ![Схема MongoDB (Chat)](./img/er_message.png)

## Автор

Программа была разработана студентом третьего курса Печёнкиным Артуром в рамках курса по дисциплине: "Технологии баз данных".

Контактная информация:

- Артур [@machinee](https://github.com/freeeakn)
