import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getSongAction from '../api_actions/songActions';

export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        // {
        //   song_name: 'songname',
        //   artist: 'art',
        //   sing_key: '-1',
        // }
      ],
      enter_song_name: '',
      enter_sing_key: 0,
      enter_artist: '',
      enter_delete_song_id: '',
    };

    this.getSongAction = this.getSongAction.bind(this);
    this.storeSongAction = this.storeSongAction.bind(this);
    this.enterSongNameChange = this.enterSongNameChange.bind(this);
    this.enterSingKeyChange = this.enterSingKeyChange.bind(this);
    this.enterArtistChange = this.enterArtistChange.bind(this);
    this.enterDeleteSongIdChange = this.enterDeleteSongIdChange.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.clearEnter = this.clearEnter.bind(this);
    this.getSongAction();

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    };
  }

  render() {
    // キーのプルダウン
    let sing_keys = this.getChooseKey(window.const.sing_key.min, window.const.sing_key.max)
    let list = [];
    for(var i in sing_keys) {
      let key = sing_keys[i]
      let temp = <option key={i} value={key}>{key}</option>;
      list.push(temp);
    }

    return (
      <div>
        <button onClick={this.getSongAction}>更新</button><br/>
        曲名：<input type="text" value={this.state.enter_song_name} onChange={this.enterSongNameChange} />
          <br/>
        歌手：<input type="text" value={this.state.enter_artist} onChange={this.enterArtistChange} /><br/>
        キー：<select value={this.state.enter_sing_key} onChange={this.enterSingKeyChange}>{list}</select><br/>
          <button onClick={this.storeSongAction}>曲を保存する。</button>　　　<button onClick={this.clearEnter}>クリアする</button>
          <br/>
          <br/>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">曲名</th>
              <th scope="col">歌手</th>
              <th scope="col">キー</th>
              {/* <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.songs.map((song, key) => {
              return <tr key={key}>
                <th scope="row">{song.song_id}</th>
                <td>{song.song_name}</td>
                <td>{song.artist}</td>
                <td>{song.sing_key}</td>
                <td>
                  <button song_id={song.song_id} onClick={() => this.deleteSong(song.song_id)}>✖︎</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }

  enterDeleteSongIdChange(event) {
    this.setState({enter_delete_song_id: event.target.value});
  }

  enterSongNameChange(event) {
    this.setState({enter_song_name: event.target.value});
  }

  enterSingKeyChange(event) {
    this.setState({enter_sing_key: event.target.value});
  }

  enterArtistChange(event) {
    this.setState({enter_artist: event.target.value});
  }

  clearEnter() {
    this.setState({
      enter_artist: "",
      enter_sing_key: 0,
      enter_song_name: ""
    });
  }

  deleteA() {
    console.log('BAA');
  }

  getSongAction() {
    axios.get('/api/songs')
      .then(response => {
        this.setState({
          songs:response.data
        });
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  deleteSong(song_id) {
    axios.post('/api/songs/delete/'+song_id)
    .then((response) => {
      this.getSongAction();
    });
  }

  storeSongAction() {
    let song = {
      song_name: this.state.enter_song_name,
      sing_key: this.state.enter_sing_key,
      artist: this.state.enter_artist,
    };
    axios.post('/api/songs', song)
    .then((response) => {
      this.getSongAction();
    });
  }

  getChooseKey(start, stop)
  {
    let step = 1;
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }
}
