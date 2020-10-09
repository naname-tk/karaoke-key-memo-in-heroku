import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getSongAction from '../api_actions/songActions';

export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this.getSongAction = this.getSongAction.bind(this);
    this.storeSongAction = this.storeSongAction.bind(this);
    this.getSongAction();


    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    };
  }

  render() {
    console.log(this.state, 'render');
    return (
      <div>
        <button onClick={this.storeSongAction}>storeSongAction</button>
        {this.state.songs.map(function(song, key){
          return <div key={key}>{song.song_name}, キー：{song.sing_key}</div>
        })}
      </div>
    );
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
      song_name: '紅蓮花',
      sing_key: '-1',
      artist: null,

    })
    .then(function (response) {
      console.log(response.data);
    });
    this.getSongAction();
  }
}
