<template>
  <div>
    <completed-header/>
    <v-layout class='center'>
      <v-flex xs8 class='min-w20'>
        <div v-for="note in notes">
          <div v-if="userId === note.userId">
            <div v-if="note.completed !== 'not completed'">
              <completed-panel :title="note.title" class="mb-4 panel">
                <h3>{{note.title}}</h3>
                <p>Description: {{note.description}}</p>
                <h6>Date Completed: {{note.completed}}</h6>
                <v-btn class="light-green mtop-1" @click="navigateTo({name: 'note', params: { noteId: note.id }})" dark>VIEW</v-btn>
              </completed-panel>
            </div>
          </div>
        </div>
        <div v-if="completed === 0">
          <h1 class='mtop-3'> No Completed Tasks </h1>
          <p> Get to work! </p>
        </div>
      </v-flex>
      <v-flex xs4>
        <completed-panel v-if="optBar" title="COMPLETED" class="side-bar ml-5">
          <v-btn class='opt-button' @click="navigateTo({name:'planner-create'})"> ADD TASK </v-btn>
          <v-btn class='opt-button' @click="navigateTo({name:'planner'})"> TASKS </v-btn>
          <v-btn class='opt-button' @click="navigateTo({name:'weekly'})"> WEEKLY </v-btn>
          <v-btn class='opt-button' @click="navigateTo({name:'overdue'})"> OVERDUE </v-btn>
        </completed-panel>
        <div class="side-bar ml-5 mtop-20">
          <a href='/#/completed'>
            <h5><br> COMPLETED <br></h5>
            <v-avatar
              class="light-green"
            >
            <v-icon dark>{{completed}}</v-icon>
            </v-avatar>
          </a>
          <a href='/#/planner'>
            <h5><br> TO DO <br></h5>
            <v-avatar
              class="orange"
            >
            <v-icon dark>{{tasks}}</v-icon>
            </v-avatar>
          </a>
          <a href='#/overdue'>
            <div class="link">
              <h5><br> OVERDUE <br></h5>
              <v-avatar
                class="red"
              >
              <v-icon dark>{{overdue}}</v-icon>
              </v-avatar>
            </div>
          </a>
        </div>
      </v-flex>
    </v-layout>
</div>
</template>

<script>
import Panel from '@/components/Panel'
import CompletedPanel from '@/components/CompletedPanel'
import CompletedHeader from '@/components/CompletedHeader'
import NotesService from '@/services/NotesService'
export default {
  components: {
    Panel,
    CompletedPanel,
    CompletedHeader
  },
  data () {
    return {
      notes: null,
      userId: null,
      optBar: false,
      tasks: 0,
      completed: 0,
      dateToday: null,
      overdue: 0
    }
  },
  async mounted () {
    // do a request to the back end for all the notes
    // when mounted, this.notes will wait for NotesService.index() to retreive data
    this.notes = (await NotesService.index()).data
    this.notes.sort((a, b) => new Date(b.duedate) - new Date(a.duedate))
    this.dateToday = new Date()
    this.dateToday = this.dateToday.setHours(0, 0, 0, 0)
    if (this.$store.state.user !== null) { this.userId = this.$store.state.user.id }
    if (this.$store.state.user !== null) { this.optBar = true }
    this.displayNumbers()
    console.log(this.notes)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    displayNumbers () {
      for (let task of this.notes) {
        if (task.userId === this.userId) {
          if (task.completed === 'not completed') {
            this.tasks += 1
            if (new Date(task.duedate) < this.dateToday) {
              this.overdue += 1
            }
          } else {
            this.completed += 1
          }
        }
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none; 
  color: black; 
}
.mtop-1 {
  margin-top:1em;
}
.operations {
  min-width:30%;
}
.add-button {
      font-size:0.875em;
      display:block;
      left:-8px;
      margin-top:35px;
      width:100%;
}
.min-w20 {
  min-width:20em;
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
.panel {
  height: 250px;
}
</style>
