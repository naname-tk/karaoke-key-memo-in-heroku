export default async function getSongAction() {
    await axios.get('/api/songs')
    .then(response => {
      songs = response.data;
      return songs;
    })
    .catch(function (error) {
        console.log(error);
    });
  // return [
  //   {song_name:"紅蓮華", sing_key:"-1"},
  //   {song_name:"Pretender", sing_key:"-2"},
  // ];
}
