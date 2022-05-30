const INITIAL_STATE = {
  favoriteSongsId: [],
  user: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FAVORITE_MUSICS':
    return {
      ...state,
      favoriteSongsId: [...state.favoriteSongsId, action.music],
    };
  case 'INFOS_LOGIN':
    return {
      ...state,
      user: action.infos,
    };
  default:
    return state;
  }
};

export default reducer;
