import { createContext } from "react";

const FavouritesContext = createContext({
    favouritesData: null,
    setFavouritesData: () => {}
});

export default FavouritesContext;