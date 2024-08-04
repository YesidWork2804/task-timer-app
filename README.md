# Task Manager App

## 📱 Descripción

Task Manager App es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios gestionar sus tareas diarias de manera eficiente. Los usuarios pueden crear, editar, eliminar y marcar tareas como completadas, así como recibir notificaciones antes de que las tareas expiren.

## 🚀 Características

- Crear nuevas tareas con título, descripción y fecha/hora de vencimiento
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas
- Recibir notificaciones 5 minutos antes de que una tarea expire
- Interfaz de usuario intuitiva y fácil de usar

## 🛠 Tecnologías Utilizadas

- [React Native](https://reactnative.dev/) ![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black)
- [Expo](https://expo.dev/) ![Expo](https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white)
- [TypeScript](https://www.typescriptlang.org/) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
- [Formik](https://formik.org/) para manejo de formularios
- [Yup](https://github.com/jquense/yup) para validación de esquemas
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para almacenamiento local
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) para notificaciones push

## 📥 Instalación

1. Clona el repositorio:



## 🖥 Uso

1. Abre la aplicación en tu dispositivo o emulador.
2. En la pantalla principal, verás la lista de tareas existentes (si las hay).
3. Para agregar una nueva tarea, toca el botón flotante "+".
4. Para editar o eliminar una tarea, selecciónala de la lista y usa los botones correspondientes.
5. Marca las tareas como completadas cuando las hayas terminado.
6. Recibirás notificaciones 5 minutos antes de que una tarea expire.

## 🧩 Estructura del Proyecto

task-manager-app/
├── src/
│   ├── domain/
        ├── task/ 
            ├──Gateway/
            ├── Models/
            ├── useCases/
│   ├── infrastructure/
      ├── task/
            ├──interfaces/
            ├── mappers/
            ├── service/
│   ├── presentation/
│   ├── services/
│   ├── ui/
        ├── components/
        ├── screens/
        ├── hooks/
│   ├── utils/
│   ├── index.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── App.test.tsx
└── package.json