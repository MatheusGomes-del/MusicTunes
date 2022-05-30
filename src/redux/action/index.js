const favoriteMusics = (music) => ({
  type: 'FAVORITE_MUSICS', music,
});

export const infosLogin = (infos) => ({
  type: 'INFOS_LOGIN', infos,
});

export default favoriteMusics;
