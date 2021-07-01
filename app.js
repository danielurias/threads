var app = new Vue({
    el: "#app",
    data: {
        page: "",
        selectedCategory: "all",
        emptyThread: "Nothing to see",
        postsEmpty: "Nothing has been posted",
        selected: "all",
        compareThread: "",
        categories: [
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "games"
        ],
        index: 0,
        postings: "",
        newName: "",
        newAuthor: "",
        newDescription: "",
        newCategory: "",
        newPostAuthor: "",
        newPostBody: "",
        threads: [
            // {
            //     name: "Thread name",
            //     author: "Becca",
            //     description: "This is the thread description",
            //     category: "all",
            //     posts: [
            //         {
            //             author: "post author",
            //             body: "description of post here"
            //         }
            //     ]
            // },
            // {
            //     name: "Thread name 2",
            //     author: "Becca",
            //     description: "This is the thread description",
            //     category: "all",
            //     posts: [
            //         {
            //             author: "post author",
            //             body: "description of post here"
            //         }
            //     ]
            // },

        ]
    },
    created: function() {
        this.getThreads();
    },
    methods: {
        getThreads: function () {
            fetch("http://forum2021.codeschool.cloud/thread").then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    app.threads = data;
                });
            });
        }, 
        createThread: function() {
            // var for a new thread
            // new_name
            var newThread = {
                name: this.newName,
                author: this.newAuthor,
                description: this.newDescription,
                category: this.newCategory
            }

            fetch("http://forum2021.codeschool.cloud/thread", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newThread)
            });
            // push to the new thread to threads list
            // this.threads.unshift(newThread);
            // cleat the inputs
            this.newName = "";
            this.newAuthor = "";
            this.newDescription = "";
            this.newCategory = "";
            this.page = "forum";
        },
        deleteThread: function (thread_id) {
            fetch(`http://forum2021.codeschool.cloud/thread/`+ thread_id, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(function(){
                app.getThreads()
            });
            //this.threads.splice(index, 1);  
        },
        getPosts: function(thread_id) {
            fetch("http://forum2021.codeschool.cloud/thread/" + thread_id).then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    app.postings = data.posts;
                });
            }).then(function () {
                app.page = "posts"
            });
        },
        createPost: function(thread_id) {
            var newPost = {
                thread_id: thread_id,
                author: this.newPostAuthor,
                body: this.newPostBody
            }
            // this.postings.unshift(newPost);

            fetch("http://forum2021.codeschool.cloud/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            }).then(function () {
                app.newPostAuthor = "";
                app.newPostBody = "";
                app.getPosts(thread_id);
            });
        },
        deletePost: function(post) {
            fetch(`http://forum2021.codeschool.cloud/post/`+ post.thread_id + "/" + post._id, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(function(){
                app.getPosts(post.thread_id);
            });
        }
    },
    computed: {
        filteredThreads: function() {
            
            var threadsArray = this.threads;
            
            var selectedCategory = this.selected;

            if (selectedCategory == "all") {
                return threadsArray;
            } else {
                var sortedThreads = this.threads.filter(function(thread) {
                    return thread.category == app.selectedCategory
                })
                return sortedThreads;
            }
        }
    }
});