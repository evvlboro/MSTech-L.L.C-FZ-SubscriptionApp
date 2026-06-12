# SubscriptionApp

Тестовое задание для компании **MSTech-L.L.C-FZ**

**Автор:** Евгений Боровиков

---

## Описание

Мобильное приложение на React Native (Expo) с экранами онбординга, оформления подписки и главным экраном. Реализует полный flow: онбординг → выбор тарифа → оплата (эмуляция) → сохранение состояния подписки.

---

## Запуск

### 1. Клонируй репозиторий

```bash
git clone https://github.com/evvlboro/MSTech-L.L.C-FZ-SubscriptionApp
cd MSTech-L.L.C-FZ-SubscriptionApp
```

### 2. Установи зависимости

```bash
npm install
```

### 3. Скачай Expo Go на мобильное устройство

- **Android** — [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS** — [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 4. Запусти сервер на ПК

```bash
npm start
```

> **Пользователи из РФ (с VPN):** если прямое подключение не работает, используй tunnel-режим:
> ```bash
> npm run start-tunnel
> ```

### 5. Отсканируй QR-код

Открой **Expo Go** на телефоне и отсканируй QR-код из терминала. Телефон и ПК должны быть в одной Wi-Fi сети (при использовании `npm start`). В tunnel-режиме это не требуется.

---

## Технологии

| Технология | Версия | Назначение |
|---|---|---|
| React Native | 0.81.5 | Основной фреймворк |
| Expo SDK | 54 | Инструментарий разработки |
| TypeScript | 5.3 | Типизация |
| React Navigation | 7 | Навигация между экранами |
| AsyncStorage | 2.2 | Хранение состояния подписки |
| Expo Vector Icons | 15 | Иконки (Ionicons) |

---

## Структура проекта

```
SubscriptionApp/
├── src/
│   ├── assets/                     # GIF-анимации
│   │   ├── sticker.gif
│   │   ├── subscribed.gif
│   │   └── not-subscribed.gif
│   ├── components/                 # Переиспользуемые компоненты
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.styles.ts
│   │   ├── RadioButton/
│   │   │   ├── RadioButton.tsx
│   │   │   └── RadioButton.styles.ts
│   │   └── CardInput/
│   │       ├── CardInput.tsx
│   │       └── CardInput.styles.ts
│   ├── screens/                    # Экраны приложения
│   │   ├── OnboardingScreen/
│   │   │   ├── OnboardingScreen.tsx
│   │   │   └── OnboardingScreen.styles.ts
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── HomeScreen.styles.ts
│   │   └── PaywallScreen/
│   │       ├── PaywallScreen.tsx
│   │       └── PaywallScreen.styles.ts
│   ├── services/
│   │   └── subscriptionService.ts  # Логика работы с AsyncStorage
│   ├── constants/
│   │   └── colors.ts               # Цвета, отступы, размеры шрифтов
│   └── types/
│       └── index.ts                # TypeScript интерфейсы
├── App.tsx                         # Точка входа, навигация
├── index.ts
├── package.json
└── tsconfig.json
```

---

## Архитектура

- **Экраны** — каждый в отдельной папке со своим файлом стилей
- **Компоненты** — переиспользуемые (`Button`, `RadioButton`, `CardInput`), каждый изолирован в папке
- **Сервис** — `subscriptionService` инкапсулирует всю работу с `AsyncStorage`
- **Типы** — централизованы в `src/types/index.ts`
- **Константы** — цвета и размеры вынесены в `src/constants/colors.ts`
- **Навигация** — `React Navigation` (Native Stack), начальный экран определяется по состоянию подписки при запуске

---

## Что можно улучшить при большем времени

- Добавить анимации переходов между экранами
- Реализовать настоящую интеграцию с платёжной системой (RevenueCat / Stripe)
- Добавить экран управления профилем
- Покрыть логику тестами (Jest + React Native Testing Library)
- Добавить поддержку тёмной темы
