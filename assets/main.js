// Todoの定義
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
            <button v-on:click="$emit('done', item)">DONE!😎</button>
            <button v-on:click="$emit('delete', item)">DELETE🤔</button>
            {{ item.name }}
        </li>
    `
});

Vue.component('done-todo-item', {
    props: ['item'],
    template: `
        <li class="todo_item">
            <button v-on:click="$emit('reopen', item)">REOPEN😅</button>
            <button v-on:click="$emit('delete', item)">DELETE🤔</button>
            {{ item.name }}
        </li>
    `
});

let vm = new Vue({
    el: '#vm',
    data: {
        item_name: '',
        item_list: [],
        id: 0
    },
    // LocalStorageからの読み込み
    created: function() {
        if (localStorage.length) {
            this.item_list = JSON.parse(localStorage.getItem('item_list'));
            this.id = localStorage.getItem('id');
        }
    },
    computed: {
        deleted_list: function() {
            return this.item_list.filter(function(item) {
                return item.isDeleted;
            });
        },
        // 削除されていないものの配列。これを基に完了未完了をまた分類する
        not_deleted_list: function() {
            return this.item_list.filter(function(item) {
                return !item.isDeleted;
            });
        },
        done_list: function() {
            return this.not_deleted_list.filter(function(item) {
                return item.isDone;
            });
        },
        not_done_list: function() {
            return this.not_deleted_list.filter(function(item) {
                return !item.isDone;
            });
        }
    },
    methods: {
        // LocalStorageへの保存
        save: function() {
            localStorage.setItem('item_list', JSON.stringify(this.item_list));
            localStorage.setItem('id', this.id);
        },
        addNewTodo: function(e) {
            if (this.item_name === '') {
                window.alert('No input');
            } else {
                let id = parseInt(this.id);
                let name = this.item_name;
                let isDone = false;
                let isDeleted = false;
                let new_item = new Item(id, name, isDone, isDeleted);
                this.item_list.push(new_item);
                this.item_name = '';
                this.id++;
                this.save();
            }
            e.preventDefault();
            e.stopPropagation();
        },
        // 完了
        closeTodo: function(item) {
            item.isDone = true;
            this.save();
        },
        // 再開
        reopenTodo: function(item) {
            item.isDone = false;
            this.save();
        },
        // 削除
        deleteTodo: function(item) {
            item.isDeleted = true;
            this.save();
        },
        // 完全削除
        removeTodo: function() {
            let confirm = window.confirm(this.deleted_list.length + '件の削除済みのアイテムを完全に削除します。よろしいですか？');
            if (confirm) {
                for (index in this.item_list) {
                    if (this.item_list[index].isDeleted) {
                        this.item_list.splice(index, 1);
                    }
                }
                this.save();
            }
        }
    }
});