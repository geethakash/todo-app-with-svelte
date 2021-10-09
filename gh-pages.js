var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/geethakash/todo-app-with-svelte.git', // Update to point to your repository  
        user: {
            name: 'Akash Geethanjana', // update to use your name
            email: 'Akashgeethanjana@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)