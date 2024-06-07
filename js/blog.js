class BlogManager {
    constructor() {
        this.blogPosts = [];
        this.blogPostsContainer = document.getElementById('blogPostsContainer');
    }

    renderBlogPosts() {
        this.blogPostsContainer.innerHTML = '';

        this.blogPosts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.classList.add('box', 'is-white');
                postElement.innerHTML = `
                    <h1 class="title">${post.title}</h1>
                     <p class="subtitle">Posted on ${post.date}</p>
                    <div class="content">
                        <p>${post.content}</p>
                    <button class="button is-white-black is-small">Read More</button>
                    <button class="button is-black-white is-small" onclick="blogManager.removePost('${post.title}')">Remove</button>
                    </div>
                `;

                this.blogPostsContainer.appendChild(postElement);
            }
        );
    }

    removePost(title) {
        this.blogPosts = this.blogPosts.filter(post => post.title !== title);

        this.renderBlogPosts();
    }

    addPost(title, content) {
        const date = new Date().toLocaleDateString();

        if (title && content) {
            this.blogPosts.push({ title, content, date });
            this.renderBlogPosts();
        }
    }
}

const blogManager = new BlogManager();

function addPost() {
    const title = document.getElementById("modal-post-name").value;
    const content = document.getElementById('modal-post-text').value;

    blogManager.addPost(title, content);
}

window.onload = () => {
    blogManager.blogPosts = [
        {
            title: 'Exploring the Beaches of Hawaii',
            content: 'Hawaii is a paradise with stunning beaches and crystal-clear waters...',
            date: 'April 1, 2023'
        },
        {
            title: 'Hiking the Inca Trail to Machu Picchu',
            content: 'The Inca Trail was a challenging but rewarding hike through the Andes...',
            date: 'August 15, 2022'
        }
    ];

    blogManager.renderBlogPosts();
}