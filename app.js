var app = new Vue({
    el: "#app",
    data: {
        page: "",
        selectedCategory: "all",
        emptyThread: "Nothing to see",
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
        threads: [
            {
                name: "Thread name",
                author: "Becca",
                description: "This is the thread description",
                category: "all",
                posts: [
                    {
                        author: "post author",
                        body: "description of post here"
                    }
                ]
            },
            {
                name: "Thread name 2",
                author: "Becca",
                description: "This is the thread description",
                category: "all",
                posts: [
                    {
                        author: "post author",
                        body: "description of post here"
                    }
                ]
            },

        ]
    },
    methods: {
        createThread: function() {
            // var for a new thread
            // new_name
            var newThread = {
                name: this.newName,
                author: this.newAuthor,
                description: this.newDescription,
                category: this.newCategory
            }
            // push to the new thread to threads list
            this.threads.unshift(newThread);
            // cleat the inputs
            this.newName = "";
            this.newAuthor = "";
            this.newDescription = "";
            this.newCategory = "";
            this.page = "forum";
        },
        deleteThread: function (index) {
            this.threads.splice(index, 1);  
        },
        getPosts: function(index) {
            this.postings = this.threads[index].posts;
            this.page = "posts";
            this.index = index;
        }
    },
    computed: {
        filteredThreads: function(){
            
            var threadsArray = this.threads;
            
            var selectedCategory = this.selected;

            if (selectedCategory == "all") {
                return threadsArray;
            } else {
                var sortedThreads = this.threads.filter(function(thread) {
                    return thread.category == selectedCategory
                })
                return sortedThreads;
            }
        }
    }
});