<template>
  <div class='top-page'> 
    <page-header/>
    <div id="root">
      <v-layout class='center'>
        <v-flex xs8 class='min-w20'>
          <div v-if="this.note.overdue === 'overdueTrue'">
            <overdue-panel :title="note.title" class="panel-250 mb-4">
              <h3> {{note.title}} </h3>
              <p>Description: {{note.description}}</p>
              <h6>Due Date: {{note.duedate}}</h6>
              <div v-if="note.completed === 'not completed'">
                <br>
                <v-btn  class="red" @click="completedNote" dark>COMPLETED</v-btn>
              </div>
               <div v-if="note.completed !== 'not completed'"> 
                <br>
                <p>Date Completed: {{note.completed}}</p>
              </div>
            </overdue-panel>
          </div>
          <div v-else>
            <panel :title="note.title" class="panel-250 mb-4">
              <h3> {{note.title}} </h3>
              <p>Description: {{note.description}}</p>
              <h6>Due Date: {{note.duedate}}</h6>
              <div v-if="note.completed === 'not completed'"> 
                <br>
                <v-btn  class="cyan" @click="completedNote" dark>COMPLETED</v-btn>
              </div>
               <div v-if="note.completed !== 'not completed'"> 
                <br>
                <p class="completed">Date Completed: {{note.completed}}</p>
              </div>
            </panel>
          </div>
        </v-flex>
        <v-flex xs4>
          <panel title="TASK" class="side-bar ml-5">
            <v-btn class='opt-button' @click="navigateTo({name:'planner'})"> TASKS </v-btn>
            <v-btn class='opt-button' @click="navigateTo({name:'planner-edit'})"> EDIT TASK </v-btn>
            <v-btn class='opt-button' @click="deleteNote"> DELETE TASK </v-btn>
          </panel>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import Panel from '@/components/Panel'
import OverduePanel from '@/components/OverduePanel'
import NotesService from '@/services/NotesService'

export default {
  data () {
    return {
      note: {},
      dateToday: null
    }
  },
  async mounted () {
    // this.store.state.route.params.noteId - vuex store, grabing the state from it,
    // since the store is synced with the router in main.js, when the router changes in the UI,
    // this vaulue also changes
    const noteId = this.$store.state.route.params.noteId
    this.note = (await NotesService.show(noteId)).data
    this.dateToday = new Date()
    this.dateToday = this.dateToday.setHours(0, 0, 0, 0)
    console.log('completedOnthis', this.completedOn)
    this.overdueCheck()
    console.log()
  },
  components: {
    Panel,
    OverduePanel,
    NotesService,
    PageHeader
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async completedNote () {
      // const noteId = this.$store.state.route.params.noteId
      console.log(this.note)
      this.note.completed = Date.now()
      this.note.completed = new Date(this.note.completed)
      this.note.completed = (this.note.completed.getMonth() + 1) + '/' + this.note.completed.getDate() + '/' + this.note.completed.getFullYear()
      this.note.overdue = 'overdueFalse'
      try {
        // send to backend
        await NotesService.put(this.note)
        console.log(this.note)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteNote () {
      try {
        console.log(this.note.id)
        await NotesService.delete(
          this.note.id
        )
        this.$router.push({
          name: 'planner'
        })
      } catch (err) {
        console.log(err)
      }
    },
    overdueCheck () {
      if (new Date(this.note.duedate) < this.dateToday) {
        this.note.overdue = 'overdueTrue'
        console.log('overdue', this.note)
      }
      console.log('MONKEY', this.note)
    }
  }
}
</script>

<style scoped>
.panel-250 {
  height: 250px;
}
.opt-button {
    font-size:0.875em;
    display:block;
    left:-8px;
    margin-top:10px;
    margin-bottom:10px;
    width:100%;
}
.completed {
  color: green;
}
.operations {
  min-width:30%;
}
.min-w20 {
  min-width:20em;
}
.center {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30em;
    width: 80%;
    padding: 10px;
}
.margin-a {
  margin:auto;
}
.margin-ra {
  margin-right:2em;
}
.margin-la {
  margin-left:2em;
}
.margin-b20 {
  margin-bottom:20px
}
.margin-r20 {
  margin-right:30px
}
.margin-l30{
  margin-left:30px;
}
</style>
