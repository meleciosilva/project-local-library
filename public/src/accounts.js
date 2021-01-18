function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((name1, name2) => name1.name.last < name2.name.last ? -1 : 1);
}

function numberOfBorrows(account, books) {
  let count = 0;
  books.forEach((book) => {
    const borrows = book.borrows;
    const {id} = account;
    borrows.forEach((borrow) => {
      if (id === borrow.id) {
      count += 1;
    }
    })
  })
  return count;
}

function getBooksPossessedByAccount(account, books, authors) { 
  const results = [];
  books.forEach((book) => {
    if(!book.borrows[0].returned && book.borrows[0].id === account.id) {
      results.push(book);
    }
  })
  results.forEach((result) => {
    const authorMatch = authors.find((author) => result.authorId === author.id);
    result.author = authorMatch;
  })
  return results;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
