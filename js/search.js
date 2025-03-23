document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // This is a simple blog post database
    // In a real implementation, you might fetch this from a JSON file
    const blogPosts = [
        {
            title: "My First Blog Post",
            url: "posts/first-post.html",
            date: "March 23, 2025",
            categories: ["Introductions", "Web Development"],
            content: "Welcome to my first blog post! This is where I'll be sharing my thoughts, experiences, and projects."
        },
        {
            title: "Getting Started with GitHub Pages",
            url: "posts/github-pages.html",
            date: "March 20, 2025",
            categories: ["Web Development", "GitHub"],
            content: "GitHub Pages is a fantastic way to host your personal website for free. In this post, I'll walk through the process of setting up a GitHub Pages site and customizing it to meet your needs."
        },
        {
            title: "How to Design a Minimalist Website",
            url: "posts/minimalist-design.html",
            date: "March 15, 2025",
            categories: ["Design", "UI/UX"],
            content: "Minimalist design focuses on simplicity and removing unnecessary elements. This post explores principles of minimalist web design and how to implement them effectively."
        },
        {
            title: "The Importance of Responsive Design",
            url: "posts/responsive-design.html",
            date: "March 10, 2025",
            categories: ["Web Development", "Design", "Mobile"],
            content: "With the increasing use of mobile devices, responsive design has become essential. Learn why responsive design matters and how to implement it in your projects."
        }
        // Add more posts here as you create them
    ];
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query.length < 2) return; // Don't search for very short queries
        
        const results = blogPosts.filter(post => {
            return post.title.toLowerCase().includes(query) || 
                  post.content.toLowerCase().includes(query) ||
                  post.categories.some(cat => cat.toLowerCase().includes(query));
        });
        
        // Store results in sessionStorage and redirect to results page
        sessionStorage.setItem('searchQuery', query);
        sessionStorage.setItem('searchResults', JSON.stringify(results));
        window.location.href = 'search-results.html';
    }
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});