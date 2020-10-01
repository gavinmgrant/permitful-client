import React from 'react';

const PermitfulContext = React.createContext({
    userId: 1,
    userName: null,
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {},
});

export default PermitfulContext;