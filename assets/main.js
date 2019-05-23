let vm = new Vue({
    el: '#vm',
    data: {
        item_name: '',
        item_list: []
    },
    methods: {
        addNewTodo: function(e) {
            if (this.item_name === '') {
                console.log('No input');
            } else {
                this.item_list.push(this.item_name);
                this.item_name = '';
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }
});