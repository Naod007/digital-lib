document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    if (bookId) {
        fetchBookDetails(bookId);
    } else {
        // Redirect if no book ID is provided
        window.location.href = 'books.html';
    }
});

function fetchBookDetails(bookId) {
    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(b => b.id == bookId);
            if (book) {
                displayBookDetails(book);
            } else {
                window.location.href = 'books.html';
            }
        })
        .catch(error => {
            console.error('Error loading book details:', error);
            window.location.href = 'books.html';
        });
}

function displayBookDetails(book) {
    document.title = `${book.name} | PDF Reader`;
    document.getElementById('bookBanner').style.backgroundImage = `url('${book.banner_img}')`;
    document.getElementById('bookTitle').textContent = book.name;
    document.getElementById('bookAuthor').textContent = book.author || 'Unknown Author';
    document.getElementById('bookCategory').textContent = book.category || 'Uncategorized';
    document.getElementById('bookRating').textContent = book.rating ? '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating)) : 'Not rated';
    document.getElementById('bookPages').textContent = book.pages ? `${book.pages} pages` : 'Page count not available';
    document.getElementById('bookDescription').innerHTML = `<p>${book.description || 'No description available.'}</p>`;
    document.getElementById('readBtn').href = book.pdf;
    document.getElementById('downloadBtn').href = book.pdf;
    document.getElementById('downloadBtn').download = `${book.name.replace(/\s+/g, '_')}.pdf`;
}

 const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click' , function(){
        if (navLinks.style.display === 'block'){
            navLinks.style.display = 'none';
        }
        else{
            navLinks.style.display = 'block'
        }
    })