import axios from 'axios';

export default class PostService {
  static async getAll(limit = 10, currentPage = 1) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: currentPage,
      },
    });
    return res;
  }

  static async getById(id) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return res;
  }
}
