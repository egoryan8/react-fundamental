import axios from 'axios';

export default class PostService {
  static async getAll() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
  }
}
