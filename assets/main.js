// Todoのアイテム
class Item {
    constructor(id, name, isDone, isDeleted) {
        this.id = id;
        this.name = name;
        this.isDone = isDone;
        this.isDeleted = isDeleted;
    }
}

Vue.component('todo-item', {
    props: ['item'],
    template: `
        <li class="todo_item">
            <input type="checkbox" v-on:click="$emit('done', item)">
            <span>{{ item.name }}</span>
            <button v-on:click="$emit('done', item)">DONE!😎</button>
            <button v-on:click="$emit('delete', item)">DELETE🤔</button>
        </li>
    `
});

Vue.component('done-todo-item', {
    props: ['item'],
    template: `
        <li class="done_item">
            <input type="checkbox" v-on:click="$emit('done', item)">
            <span>{{ item.name }}</span>
            <button v-on:click="$emit('reopen', item)">REOPEN😅</button>
            <button v-on:click="$emit('delete', item)">DELETE🤔</button>
        </li>
    `
});

let vm = new Vue({
    el: '#vm',
    data: {
        item_name: '',
        item_list: []
    },
    computed: {
        done_list: function() {
            return this.item_list.filter(function(item) {
                return item.isDone;
            });
        },
        not_done_list: function() {
            return this.item_list.filter(function(item) {
                return !item.isDone;
            });
        }
    },
    methods: {
        addNewTodo: function(e) {
            if (this.item_name === '') {
                window.alert('No input');
            } else {
                let id = this.item_list.length;
                let name = this.item_name;
                let isDone = false;
                let isDeleted = false;
                let new_item = new Item(id, name, isDone, isDeleted);
                this.item_list.push(new_item);
                this.item_name = '';
            }
            e.preventDefault();
            e.stopPropagation();
        },
        closeTodo: function(item){
            let index = this.item_list.indexOf(item);
            this.item_list.splice(index, 1);
            this.item_list.unshift(item);
        },
        reopenTodo: function(item){
            let index = this.item_list.indexOf(item);
            this.item_list.splice(index, 1);
            this.item_list.unshift(item);
        },
        deleteTodo: function(item){

        }
    }
});