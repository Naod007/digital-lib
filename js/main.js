document.addEventListener('DOMContentLoaded', function() {
    
   

    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            
            
            displayFeaturedBooks(books);
            
            
            displayTrendingBooks(books);
            
            
            displayFavoriteBooks(books);
            
           
            setTimeout(() => {
                initSlider();
            }, 100);
        })
        .catch(error => console.error('Error loading books:', error));
});

function displayFeaturedBooks(books) {
    const featuredContainer = document.getElementById('featuredBooks');
    const featuredBooks = books.filter(book => book.featured);
    
    // If more than 10, select randomly
    const displayBooks = featuredBooks.length > 10 ? 
        getRandomItems(featuredBooks, 10) : featuredBooks;
    
    displayBooks.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.className = 'featured-book';
        bookElement.style.animationDelay = `${index * 0.1}s`; // Staggered animation
        bookElement.innerHTML = `
            <div class="featured-banner" style="background-image: url('${book.banner2_img || book.banner_img}')"></div>
            <div class="featured-content">
                <h3>${book.name}</h3>
                <p>${book.description || 'No description available.'}</p>
                <a href="${book.pdf}" class="read-btn" target="_blank">Read Now</a>
            </div>
        `;
        featuredContainer.appendChild(bookElement);
    });
}

function displayTrendingBooks(books) {
    const trendingContainer = document.getElementById('trendingBooks');
    const trendingBooks = books.filter(book => book.trending);
    
   
    const displayBooks = trendingBooks.length > 8 ? 
        getRandomItems(trendingBooks, 8) : trendingBooks;
    
    displayBooks.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.style.animationDelay = `${index * 0.05}s`; // Staggered animation
        bookElement.innerHTML = `
            <div class="book-banner" style="background-image: url('${book.banner_img}')"></div>
            <div class="book-info">
                <h3>${book.name}</h3>
                ${book.author ? `<p class="book-author">${book.author}</p>` : ''}
            </div>
        `;
        
        // Add click event to navigate to book details page
        bookElement.addEventListener('click', () => {
            window.location.href = `book.html?id=${book.id}`;
        });
        
        trendingContainer.appendChild(bookElement);
    });
}

function displayFavoriteBooks(books) {
    const favoriteContainer = document.getElementById('favoriteBooks');
    const favoriteBooks = books.filter(book => book.favorites);
    
    // If more than 20, select randomly
    const displayBooks = favoriteBooks.length > 16 ? 
        getRandomItems(favoriteBooks, 16) : favoriteBooks;
    
    displayBooks.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.style.animationDelay = `${index * 0.05}s`; 
        bookElement.innerHTML = `
            <div class="book-banner" style="background-image: url('${book.banner_img}')"></div>
            <div class="book-info">
                <h3>${book.name}</h3>
                ${book.author ? `<p class="book-author">${book.author}</p>` : ''}
            </div>
        `;
        
       
        bookElement.addEventListener('click', () => {
            window.location.href = `book.html?id=${book.id}`;
        });
        
        favoriteContainer.appendChild(bookElement);
    });
}

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function initSlider() {
    const slider = document.querySelector('.featured-container');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const books = document.querySelectorAll('.featured-book');
    
    if (!slider || !prevBtn || !nextBtn || books.length === 0) return;
    
    let currentIndex = 0;
    const bookWidth = books[0].offsetWidth + 20; 
    const visibleBooks = Math.floor(slider.offsetWidth / bookWidth);
    const totalBooks = books.length;
    
    const centerBook = () => {
        const scrollPosition = currentIndex * bookWidth - (slider.offsetWidth / 2 - bookWidth / 2);
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };
    
    const updateButtons = () => {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalBooks - visibleBooks;
    };
    
    const goNext = () => {
        if (currentIndex < totalBooks - visibleBooks) {
            currentIndex++;
            centerBook();
            updateButtons();
        }
    };
    
    const goPrev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            centerBook();
            updateButtons();
        }
    };
    
    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goNext();
        } else if (e.key === 'ArrowLeft') {
            goPrev();
        }
    });
    
    let autoScroll = setInterval(goNext, 5000);
    
    // Pause auto-scroll on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoScroll = setInterval(goNext, 5000);
    });
    
    
    updateButtons();
    
    setTimeout(centerBook, 100);
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
