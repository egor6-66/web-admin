# useModuleLoader
Подключает удаленные модули

### props
* url - адрес удаленного модуля
* scope - название удаленного модуля
* module - путь до компонента в удаленном модуле
* errorComponent - компонент который отобразится в случае ошибки загрузки
* module - компонент который отображается во время загрузки

### returned
* status - статус загрузки 'loading' | 'success' | 'error'
* Module - компонент

### example
```jsx
const { Module } = useModuleLoader({
      url: process.env.CARD_MODULE_URL,
      scope: 'card',
      module: './Card',
      errorComponent: <div>error</div>,
      loadingComponent: <div>loading</div>,
      onError: () => {
        console.log('error');
      },
});

return <Module/>;
```
