import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    async function post(){
      try{
        const {data} = await axios.get('https://practiceapi.devmountain.com/api/posts');
        return data;
      }catch(err){
        console.log(err)
      }
    }
    Promise.resolve(post()).then(resolve => this.setState({posts: resolve}));
  }

  async updatePost(post) {
    try{
        const {data} = await axios.put(`https://practiceapi.devmountain.com/api/posts?id=${post.id}`,{text: post.text})
        
        this.setState(state => ({posts: [...state,...data]}));
    }catch(error){
      console.log(error);
    }
  }

  async deletePost(id) {
    try{
      const {data} = await axios.delete(`${baseURL}?id=${id}`);
  
      this.setState(state=> ({posts: [...state,...data]}));
    }catch(err){
      console.log(err);
    }
  }

  async createPost(text) {
    try{
      const {data} = await axios.post(`${baseURL}`,{text : text})

      this.setState(state=>{
        return {posts: [...data]}
      })
    }catch(error){
      console.log(error);
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map(post => <Post key={post.id} text={post.text} date={post.date} updatePostFn={this.updatePost} id={post.id} deletePostFn={this.deletePost} />)}
        </section>
      </div>
    );
  }
}

export default App;


const baseURL = "https://practiceapi.devmountain.com/api/posts";