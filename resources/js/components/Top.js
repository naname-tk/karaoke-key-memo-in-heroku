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
    };
    this.getSongAction = this.getSongAction.bind(this);
    this.storeSongAction = this.storeSongAction.bind(this);
    this.enterSongNameChange = this.enterSongNameChange.bind(this);
    this.enterSingKeyChange = this.enterSingKeyChange.bind(this);
    this.enterArtistChange = this.enterArtistChange.bind(this);
    this.getSongAction();

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    };
  }

  render() {
    return (
      <div>
        曲名：<input type="text" value={this.state.enter_song_name} onChange={this.enterSongNameChange} /><br/>
        キー：<input type="text" value={this.state.enter_sing_key} onChange={this.enterSingKeyChange} /><br/>
        歌人：<input type="text" value={this.state.enter_artist} onChange={this.enterArtistChange} /><br/>
        <button onClick={this.storeSongAction}>曲を保存する。</button>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">曲名</th>
              <th scope="col">アーティスト</th>
              <th scope="col">キー</th>
            </tr>
          </thead>
          <tbody>
            {this.state.songs.map(function(song, key){
              return <tr>
                <th scope="row">#</th>
                <td>{song.song_name}</td>
                <td>{song.artist}</td>
                <td>{song.sing_key}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }

  enterSongNameChange(event)
  {
    this.setState({enter_song_name: event.target.value});
  }

  enterSingKeyChange(event)
  {
    this.setState({enter_sing_key: event.target.value});
  }

  enterArtistChange(event)
  {
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
    axios.post('/api/songs', {
      song_name: this.state.enter_song_name,
      sing_key: this.state.enter_sing_key,
      artist: this.state.enter_artist,
    })
    .then(function (response) {
      console.log(response.data);
    });
    this.getSongAction();
  }
}
