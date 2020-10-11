import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getSongAction from '../api_actions/songActions';

export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      enter_song_name: '',
      enter_sing_key: '',
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
    this.getSongAction();

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.getSongAction}>更新</button><br/>
        曲名：<input type="text" value={this.state.enter_song_name} onChange={this.enterSongNameChange} /><br/>
        歌手：<input type="text" value={this.state.enter_artist} onChange={this.enterArtistChange} /><br/>
        キー：<input type="text" value={this.state.enter_sing_key} onChange={this.enterSingKeyChange} /><br/>
        <button onClick={this.storeSongAction}>曲を保存する。</button><br/><br/>
        削除ID<input type="text" value={this.state.enter_delete_song_id} onChange={this.enterDeleteSongIdChange} /><br/>
        <button onClick={this.deleteSong}>曲を消す</button><br/>


        <table class="table">
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

            {this.state.songs.map(function(song, key) {
              return <tr key={key}>
                <th scope="row">{song.song_id}</th>
                <td>{song.song_name}</td>
                <td>{song.artist}</td>
                <td>{song.sing_key}</td>
                {/* <td><button song_id={song.song_id} onClick={this.deleteSong}>✖︎</button></td> */}
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

  storeSongAction() {
    let song = {
      song_name: this.state.enter_song_name,
      sing_key: this.state.enter_sing_key,
      artist: this.state.enter_artist,
    };
    axios.post('/api/songs', song)
    .then(function (response) {
      console.log(response.data);
    });
    let tmp = this.state.songs;
    tmp.push(song);
    this.setState({songs: tmp})
  }

  deleteSong(event) {
    axios.post('/api/songs/delete/'+this.state.enter_delete_song_id)
    .then(function (response) {
      console.log(response.data);
    });
    this.getSongAction()
  }
}
