Vue.component('todo-item', {
    props: ['item'],
    template: `
        <li>
            <input type="checkbox" v-on:click="$emit('done', item)">
            <span>{{ item }}</span>
        </li>
    `
});

Vue.component('done-todo-item', {
    props: ['item'],
    template: `
        <li>
            <input type="checkbox" v-on:click="">
            <span>{{ item }}</span>
        </li>
    `
});

let vm = new Vue({
    el: '#vm',
    data: {
        item_name: '',
        item_list: [],
        done_item_list: []
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
        },
        closeTodo: function(item){
            let index = this.item_list.indexOf(item);
            this.item_list.splice(index, 1);
            this.done_item_list.unshift(item);
        }
    }
});