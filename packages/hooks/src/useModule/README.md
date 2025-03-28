# use[Brodcast](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

Обеспечивает связь между модулями  
Реализован через [useZustand](https://www.npmjs.com/package/react-use-zustand?activeTab=readme) для [singleton](https://refactoringguru.cn/ru/design-patterns/singleton)  
* init должен вызываться на уровне APP, в него передается название канала(имя модуля) это гарантирует нам один экземпляр бродкаста  
* send передаем название ивента и данные которые нужно отправить  
* listener передаем название ивента и колбэк который отработает при нужном событии

```jsx

```
