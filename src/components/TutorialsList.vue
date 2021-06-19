<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search by Title"
                    v-model="title"
                />
                <div class="input-group-append">
                    <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="searchTitle"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Tutorials List</h4>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)"
                >
                    {{ tutorial.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" v-if="tutorials.length > 0" @click="removeAllTutorials">
                Remove All
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Tutorial</h4>
                <div>
                    <label>
                        <strong>Title:</strong> {{ currentTutorial.title }}
                    </label>
                    <div class="form-group">
                        <strong>Description:</strong>
                        <p>{{ currentTutorial.description }}</p>
                    </div>
                </div>
                <button class="btn btn-primary" @click="goToDetails">Go to details</button>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService';

export default {
    name: "tutorials-list",
    data() {
        return {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrieveTutorials: function() {
            TutorialDataService.getAll()
                .then(response => {
                    this.tutorials = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList: function() {
            this.retrieveTutorials();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },

        setActiveTutorial: function(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removeAllTutorials: function() {
            TutorialDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchTitle: function() {
            TutorialDataService.findByTitle(this.title)
                .then(response => {
                    this.tutorials = response.data;
                    this.setActiveTutorial(null);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        goToDetails: function() {
            this.$router.push('/tutorials/' + this.currentTutorial.id)
        }
    },
    mounted: function() {
        this.retrieveTutorials();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>
