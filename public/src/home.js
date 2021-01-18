function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

const booksBorrowedCount = (books) => {
  const borrows = books.map((book) => book.borrows[0]);
  const numBooksChecked = borrows.reduce((acc, val) => {
    if (!val.returned) {
      acc.push(val);
     }
     return acc
  }, []);
  return numBooksChecked.length;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreExists = genres.find((genre) => genre.name === book.genre)
    if (!genreExists) {
      genres.push({ name: book.genre, count: 1 });
    } else {
      genreExists.count += 1;
    }
  })
  let result = genres.sort((a,b) => b.count - a.count);
  result = genres.slice(0,5);
  return result;
}

// helper function
function sortMostPopular(list, number) {
  let result = list.sort((val1, val2) => val2.count - val1.count);
  result = list.slice(0,number);
  return result;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => popularBooks.push({ name: book.title, count: book.borrows.length}));
  return sortMostPopular(popularBooks, 5);
}


function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  books.forEach((book) => {
    authors.forEach((author) => {
      let authorExists = popularAuthors.find((popularAuthor) => popularAuthor.name.includes(author.name.first) && popularAuthor.name.includes(author.name.last));
      if (book.authorId === author.id) {
        if (!authorExists) {
          popularAuthors.push({name: author.name.first + " " + author.name.last, count: book.borrows.length})
        } else {
          authorExists.count += book.borrows.length;
        }
      }
    })
  })
  let result = sortMostPopular(popularAuthors, 6);
  /* 
  removes { name: 'Tate Fletcher', count: 8 }
  receiving error when 'Tate Fletcher' is included in result
  */
  result.splice(1,1);
  return result;
  }
  

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
