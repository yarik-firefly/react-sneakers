import React from 'react'

// Создаём отдельный компонент в котором создаём Контекст и экспортируем его
const AppContext = React.createContext<any>({});

export default AppContext;