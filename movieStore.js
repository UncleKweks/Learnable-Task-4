// MovieStore
class Movie {
  constructor(id, title, totalStock) {
    this.id = id;
    this.title = title;
    this.totalStock = totalStock;
    this.availableStock = totalStock;
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
}

class MovieStore {
  constructor() {
    this.movies = [];
    this.users = {};
  }

  addUser(name) {
    const user = new User(name);
    this.users[name] = [];
    return user;
  }

  addMovie(title, totalStock) {
    const id = this.movies.length + 1;
    const movie = new Movie(id, title, totalStock);
    this.movies.push(movie);
    return movie;
  }

  getMovies() {
    return this.movies.map(({ id, title, availableStock }) => ({
      id,
      title,
      availableStock,
    }));
  }

  getMovieById(movieId) {
    return this.movies.find((movie) => movie.id === movieId);
  }

  rentMovie(user, movieId) {
    const movie = this.getMovieById(movieId);
    if (movie && movie.availableStock > 0) {
      movie.availableStock--;
      this.users[user.name].push(movie);
      return { success: true, message: "Movie rented successfully." };
    } else {
      return {
        success: false,
        message: "Movie not available for rent or invalid movie ID.",
      };
    }
  }

  returnMovie(user, movieId) {
    const movie = this.getMovieById(movieId);
    if (movie && this.users[user.name]) {
      const userMovies = this.users[user.name];
      const rentedMovieIndex = userMovies.findIndex((m) => m.id === movieId);
      if (rentedMovieIndex !== -1) {
        movie.availableStock++;
        this.users[user.name].splice(rentedMovieIndex, 1);
        return { success: true, message: "Movie returned successfully." };
      }
    }
    return {
      success: false,
      message: "Invalid return operation or movie not rented by the user.",
    };
  }

  viewRentedMovies(user) {
    return this.users[user.name] || [];
  }
}

const movieStore = new MovieStore();

const user1 = movieStore.addUser("Ken");
const user2 = movieStore.addUser("Lucy");

movieStore.addMovie("Barbie", 20);
movieStore.addMovie("Batman Begins", 30);
movieStore.addMovie("Toy Story III", 6);
movieStore.addMovie("Dunkrik", 10);
movieStore.addMovie("Avatar II:Way of Water", 60);
movieStore.addMovie("The Irishman", 40);
movieStore.addMovie("Bullet Train", 25);

console.log("Available Movies:");
console.log(movieStore.getMovies());

console.log("Renting movie for Ken:", movieStore.rentMovie(user1, 1));
console.log("Renting movie for Lucy:", movieStore.rentMovie(user2, 2));

console.log("Available Movies after renting:");
console.log(movieStore.getMovies());

console.log("Returning movie for Ken:", movieStore.returnMovie(user1, 1));

console.log("Available Movies after returning:");
console.log(movieStore.getMovies());

console.log("Movies rented by Lucy:");
console.log(movieStore.viewRentedMovies(user2));
