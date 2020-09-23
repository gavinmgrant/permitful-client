import React from 'react';

const PermitfulContext = React.createContext({
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {},
});

export default PermitfulContext;