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

    let currentPage = 1;
    const booksPerPage = 50;
    let allBooks = [];
    let displayedBooks = [];

    // Fetch books data
    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            allBooks = data.books;
            displayedBooks = [...allBooks];
            displayBooks();
        })
        .catch(error => console.error('Error loading books:', error));

    // Load more functionality
    document.getElementById('loadMore').addEventListener('click', function() {
        currentPage++;
        displayBooks();
    });

    // Search functionality
    document.getElementById('bookSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            displayedBooks = [...allBooks];
        } else {
            displayedBooks = allBooks.filter(book => 
                book.name.toLowerCase().includes(searchTerm) ||
                (book.author && book.author.toLowerCase().includes(searchTerm)) ||
                (book.category && book.category.toLowerCase().includes(searchTerm)) ||
                (book.description && book.description.toLowerCase().includes(searchTerm))
            );
        }
        currentPage = 1;
        displayBooks();
    });

    function displayBooks() {
        const booksContainer = document.getElementById('allBooks');
        const loadMoreBtn = document.getElementById('loadMore');
        
        // Clear container if it's the first page
        if (currentPage === 1) {
            booksContainer.innerHTML = '';
        }
        
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const booksToDisplay = displayedBooks.slice(startIndex, endIndex);
        
        if (booksToDisplay.length === 0 && currentPage === 1) {
            booksContainer.innerHTML = '<p class="no-results">No books found matching your search.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        booksToDisplay.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';
            bookElement.innerHTML = `
                <div class="book-banner" style="background-image: url('${book.banner_img}')"></div>
                <div class="book-info">
                    <h3>${book.name}</h3>
                    ${book.author ? `<p class="book-author">${book.author}</p>` : ''}
                    <div class="book-meta">
                        ${book.category ? `<br><span class="book-category">${book.category}</span>` : ''}
                        ${book.rating ? `<br><br>Rating : <span class="book-rating">${book.rating}</span>` : ''}
                    </div>
                </div>
            `;
            
            // Add click event to navigate to book details page
            bookElement.addEventListener('click', () => {
                window.location.href = `book.html?id=${book.id}`;
            });
            
            booksContainer.appendChild(bookElement);
        });
        
        // Hide load more button if all books are displayed
        if (endIndex >= displayedBooks.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
});

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