const INITIAL_STATE = {
  favoriteSongsId: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FAVORITE_MUSICS':
    return {
      ...state,
      favoriteSongsId: [...state.favoriteSongsId, action.music],
    };
  default:
    return state;
  }
};

export default reducer;
